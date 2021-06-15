# vanx

next generation state manager.

## Pros

1. natively 100% percently suport Unit Testing.
2. Purly native javascript way to manage State.

## cons

unfounded.

## philosophy

Vuex, Flux, Redux and blablabla is too complicated.
A simple Class is strong enough.

# useage

All your states defined as a plain Class, only extra work is extends this Class by Vanx.
then everything are booted up.

in Store:

```ts
import Vanx from 'vanx';
// Create a Class to manage a state.
// this Class should extends Vanx.
class Calcutor extends Vanx {
  protected result = 0;
  public plus() {
    this.result++;
  }
  public minus() {
    this.result--;
  }
}
// export your state by instantiate your State manage Class.
export const calcutor = new Calcutor();
```

in Vue file:

```ts
import { Component, Prop, Vue } from 'vue-property-decorator';
import { calcutor, powerfulCalcutor } from './store';

@Component
export default class HelloWorld extends Vue {
  // inject Variable in Calcutor to Vue Component.
  @calcutor.decorator('result')
  private calcutorResule!: number;
  private plus() {
    // call methods in Calcutor to manipulate state.
    // then Vanx will tell Vue to update the Dom
    calcutor.plus();
  }
  private minus() {
    calcutor.minus();
  }
}
```

so easy.
