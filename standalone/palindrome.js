if (!process.argv[2]) {
  console.error("no input");
  return;
}

function checkPalindrome(str) {
  for (let i = 0; i < str.length / 2; i++) {
    console.log(str[i], str[str.length - i - 1]);
    if (str[i] !== str[str.length - i - 1]) {
      return false;
    }
  }
  return true;
}

let result = checkPalindrome(process.argv[2]);
console.log(`${process.argv[2]} is${result ? " " : " not "}a palindrome`);
