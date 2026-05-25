// the act of taking a functon output and passing it to the next runnable function

import { RunnableLambda } from "@langchain/core/runnables";

const func1 = (x) => x.toString();
const func2 = (x) => x.toUpperCase();
const func3 = (x) => x.slice(0, 4) + " " + "is real";

const runnable1 = RunnableLambda.from(func1);
const runnable2 = RunnableLambda.from(func2);
const runnable3 = RunnableLambda.from(func3);

// 2 methods for running a chain of runnables
// using pipe (sequential execution)
// using batch (parallel execution)
// using invoke (single execution)

// const chain = await runnable1.pipe(runnable2).pipe(runnable3);

// const result = await chain.invoke("Hello");

const result = await runnable2.batch(["Hello", "World"]);
console.log(result);
