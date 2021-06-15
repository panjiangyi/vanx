
type Updator = (v: unknown, vName: string) => void;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type VueType = any
const noop = () => null;
export default class StoreCore {
    private proxied = false;
    protected proxy(this: StoreCore) {
        if (this.proxied) return
        Object.keys(this).filter(key => !["eventCenter", "decorator"].includes(key)).forEach((key: string) => {
            let value: unknown = this[key as keyof StoreCore];
            Object.defineProperty(this, key, {
                set: (v: unknown) => {
                    value = v;
                    this.eventCenter.forEach(func => func(value, key));
                },
                get: () => {
                    return value;
                }
            })
        })
        this.proxied = true
    }
    protected eventCenter: Array<Updator> = []
    public decorator(wantedVariable: string) {
        this.proxy()
        const store = this;
        return function (target: VueType, name: string) {
            target[name] = store[wantedVariable as keyof StoreCore];
            const oldCreated = target.created || noop;
            const oldBeforeDestroy = target.beforeDestroy || noop;

            let updator: Updator
            target.created = function (this: VueType, ...params: readonly unknown[]) {
                updator = (v: unknown, vName: string) => {
                    if (vName !== wantedVariable) return;
                    this[name] = v
                }
                store.eventCenter.push(updator)
                return oldCreated.apply(this, params);
            }
            target.beforeDestroy = function (this: VueType, ...params: readonly unknown[]) {
                store.eventCenter = store.eventCenter.filter(k => k !== updator);
                return oldBeforeDestroy.apply(this, params);
            }
            return target
        };
    }
}