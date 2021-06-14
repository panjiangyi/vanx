# vanx

next generation state manager.

## Pros

1. natively 100% percently suport Unit Testing.
2. Purly native javascript way to manage State.

## cons

unfounded.

# useage

in Store:

```ts
import Vanx from 'vanx';
class Calcutor extends Vanx {
  constructor() {
    super();
    this.proxy();
  }
  protected result = 0;
  public plus() {
    this.result++;
  }
  public minus() {
    this.result--;
  }
}
```

in Vue file:

```ts
import { Component, Prop, Vue } from 'vue-property-decorator';
import { calcutor, powerfulCalcutor } from './store';

@Component
export default class HelloWorld extends Vue {
  @calcutor.decorator('result')
  private calcutorResule!: number;
  private plus() {
    calcutor.plus();
  }
  private minus() {
    calcutor.minus();
  }
}
```

so easy.
