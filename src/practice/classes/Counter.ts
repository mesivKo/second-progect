export class Counter {
  value: number;

  constructor() {
    this.value = 0;
  }

  increment() {
    this.value += 1;
  }

  decrement() {
    this.value -= 1;
  }

  reset() {
    this.value = 0;
  }
}
