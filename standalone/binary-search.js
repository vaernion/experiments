const sample = [
  10,
  15,
  20,
  30,
  50,
  80,
  150,
  200,
  500,
  1000,
  2000,
  2001,
  2002,
  2003,
  2004,
  2005,
  2010,
];

console.log(binSearch(sample, 1000));

// finds index of a number in a sorted array
function binSearch(arr, num) {
  if (!arr || !Array.isArray(arr)) return "first parameter must be an array";
  if (typeof num !== "number") return "second parameter must be number to find";
  return binSearchDrone(arr, num, 0, arr.length - 1);
}

// recursively called until done
function binSearchDrone(arr, num, i1, i2) {
  if (i2 < i1) return -1;

  const mid = i1 + Math.floor((i2 - i1) / 2);

  console.log(`searching [${mid}] in the mid of [${i1}] to [${i2}]`);

  if (arr[mid] === num) return mid;
  else if (num > arr[mid]) return binSearchDrone(arr, num, mid + 1, i2);
  else return binSearchDrone(arr, num, i1, mid - 1);
}
