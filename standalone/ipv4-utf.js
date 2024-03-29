let test = "110.0.29.52";
let testEnc = encode(test);

function encode(ip) {
  if (
    ip
      .split(".")
      .map((e) => Number(e) > 255 || Number(e) < 0)
      .filter((e) => e === true).length > 0
  ) {
    throw new Error("invalid ip input: " + ip);
  }
  return ip
    .split(".")
    .map((e) => String.fromCharCode(e))
    .join("");
}

function decode(string) {
  return string
    .split("")
    .map((e) => e.charCodeAt(0))
    .join(".");
}

console.log(testEnc);
console.log(decode(testEnc));
