/**
 * @param {number} number
 * @returns {boolean} true if input number is strange, false otherwise
 */

const isNumberStrange = (number) => {
  const div = [];

  for (let i = 1; i <= Math.floor(number / 2); i++) {
    if (number % i === 0) {
      div.push(i);
    }
  }

  return div.reduce((acc, divider) => acc + divider, 0) === number;
};
