/**
 * Calls all functions in the array
 * @param {array} array with functions
 * @returns undefined
 */

const callFunctionsFromArray = (array) => {
  array.forEach((func, index) => {
    console.log(`${index} func has started`);
    func();
  });
};

const callAsyncFunctionsFromArray = async (array) => {
  for (let i = 0; i < array.length; i++) {
    console.log(`${i + 1}th function is in progress`);
    await array[i]();
    console.log(`${i + 1}th function is over`);
  }
};
