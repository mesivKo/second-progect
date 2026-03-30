import { Counter } from "../counter";

export class RootStore {
    counterStore: Counter;

    constructor() {
        this.counterStore = new Counter();
    }
}

export const rootStore = new RootStore();