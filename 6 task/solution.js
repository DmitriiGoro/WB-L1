/**
 * Sort array by age or by name if ages are equal
 * @param {array} array
 * @returns {array}
 */

const sortByAge = (array) => {
  return array.sort((oneUser, secondUser) => {
    if (oneUser.age === secondUser.age) {
      return oneUser.name - secondUser.name;
    }
    return oneUser.age - secondUser.age;
  });
};
