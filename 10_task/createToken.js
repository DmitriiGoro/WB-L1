/**
 * Функция возвращает объект токена со значением типа (type) и необязательным значенением value
 * @param {string} type
 * @param {string} [value]
 * @returns {object}
 */

const createToken = (type, value) => {
  return {
    type,
    value,
  };
};

module.exports = { createToken };
