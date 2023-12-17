/**
 * @param {string} string
 * @returns {boolean} true if a string is palindrome, false otherwise
 */

const checkPalindrome = (string) => {
  const formattedString = string.toLowerCase().split(" ").join("");

  let i = 0;
  let j = formattedString.length - 1;

  while (i < j) {
    if (formattedString[i++] !== formattedString[j--]) {
      return false;
    }
  }
  return true;
};
