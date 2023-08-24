// basic
const list = [1, 2, 3, 4];

const createAdder = (add: number) => (n: number) => n + add;
const createMultiplier = (factor: number) => (n: number) => n * factor;

const adder = createAdder(2);
const doubler = createMultiplier(2);
const squarer = (n: number) => n * n;

const myNumberFuncs = [adder, squarer, doubler];

const compose = <T>(value: T, funcs: ((x: T) => T)[]) =>
  funcs.reduce((accum, func) => func(accum), value);

const listCompose = <T>(values: T[], funcs: ((x: T) => T)[]) =>
  values.map((v) => compose(v, funcs));

console.log(listCompose(list, myNumberFuncs));

// more compact all-in-one

const mixedList = [2, "b", null, {}];

const filterNum = (x: unknown) => typeof x !== "number";
const filterNull = (x: unknown) => x !== null;
const filterFuncs = [filterNum, filterNull];

const listFilterCompose = <T>(values: T[], funcs: ((x: T) => T)[]) =>
  funcs.reduce((accum, func) => accum.filter(func), values);

console.log(listFilterCompose(mixedList, filterFuncs));
