// silly way to iterate range of numbers
function* myGen(range) {
  let i = 0;
  while (i < range) {
    i++;
    yield i;
  }
}

let myIterator = myGen(4);
console.log(myIterator.next());
for (const num of myIterator) console.log("myIter", num);

let secondIterator = myGen(3);
for (const num of secondIterator) console.log("secondIter", num);

// persistent id gen example
function* idGen() {
  let i = 0;
  while (true) {
    i++;
    yield `id-${i}`;
  }
}

const store = {};
const myIdGen = idGen();

const addItem = (item) => {
  const id = myIdGen.next().value;
  store[id] = { id: Number(id.replace("id-", "")), item };
};

addItem({ name: "Luke", class: "Jedi" });
addItem({ name: "Chewie", class: "Pilot" });
console.dir(store);

// multiple yields
function* weirdWayToProgramImperatively() {
  yield console.info("first thing");
  yield console.log("wow we did something else here");
  yield console.warn(
    "don't try again, generator will overload (nothing will happen)"
  );
}

const weirdIterator = weirdWayToProgramImperatively();

function pretendThisIsAnEventHandler() {
  weirdIterator.next();
}

for (let i = 0; i < 3; i++) pretendThisIsAnEventHandler();
