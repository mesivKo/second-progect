import { makeAutoObservable } from 'mobx';

export class Counter {
    value: number = 0;

    constructor() {
        makeAutoObservable(this, {}, {autoBind: true});
    }

    get count() {
        return this.value;
    }

    increment() {
        this.value++;
    }

    decrement() {
        this.value--;
    }

    reset() {
        this.value = 0;
    }

    double() {
        this.value *= 2;
    }
}
