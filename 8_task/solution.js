/**
 * Takes an array of functions and return a function with array closured
 * @param {array} array
 * @returns {array} of results
 */

const wrapper = (array) => {
  return function () {
    return array.map((func) => func());
  };
};

const asyncWrapper = (array) => {
  return function () {
    return Promise.all(array.map((func) => func()));
  };
};
