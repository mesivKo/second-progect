import { Counter } from "./Counter";
import { Book } from "./Book";

const counter = new Counter();
console.log(counter);

console.log(counter.value);

counter.increment();
console.log(counter.value);

counter.decrement();
console.log(counter.value);
counter.increment();
counter.increment();
console.log(counter.value);
counter.reset();
console.log(counter.value);
const a = new Counter();
const b = new Counter();
a.increment();
a.increment();

console.log(a.value);
console.log(b.value);

const myBook = new Book("анекдоты", 500);
console.log(myBook.getInfo());

console.log(myBook.read(120));
console.log(myBook.getProgress());

console.log(myBook.read(400));
console.log(myBook.isFinished());

console.log(myBook.restart());
console.log(myBook.isFinished());

console.log(myBook.read(-5));
console.log(myBook.read(0));
// npx tsx src/practice/classes/index.ts
