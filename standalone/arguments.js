let abc = 10;
let x = sum(1, 2, 3, abc);

function sum() {
  let y = 0;
  console.log(arguments);
  for (let argument of arguments) {
    y += argument;
  }
  console.log(y);
  arguments[3] = 11;
}
console.log(abc);

let sym = Symbol("<3");
console.log(sym.toString());
