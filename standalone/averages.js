// create data to find averages for
let input = [];
let inputCount = 50;
let inputRange = 10;
let decimals = 1;
for (i = 0; i < inputCount; i++) {
  input.push(Number((Math.random() * inputRange).toFixed(decimals)));
}
let inputSorted = [...input].sort((a, b) => a - b);

// find averages
let mean = (input.reduce((sum, num) => sum + num, 0) / input.length).toFixed(
  decimals
);
let median = findMedian(inputSorted);
let mode = findMode(input);

function findMedian(array) {
  if (array.length % 2 === 0) {
    return (
      array
        .slice(array.length / 2 - 1, array.length / 2 + 1)
        .reduce((sum, num) => sum + num) / 2
    ).toFixed(decimals);
  } else {
    return array.slice(array.length / 2);
  }
}
function findMode() {
  let dupes = new Map();
  for (let num of input) {
    dupes.set(num, dupes.get(num) ? dupes.get(num) + 1 : 1);
  }
  console.log("duplicates", dupes);
  let maxDuplicates = Math.max(...dupes.values());
  let results = [];
  dupes.forEach((value, key) => {
    if (value === maxDuplicates) {
      results.push(key);
    }
  });
  console.log("maxDuplicates", maxDuplicates);
  return results;
}

// output results
console.log("raw", input);
console.log("sorted", inputSorted);
console.log(`mean: ${mean}`);
console.log(`median: ${median}`);
console.log(`mode: ${mode}`);
