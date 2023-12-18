/**
 * Функция создает объект JSON, начиная с массива properties корневого элемента АСД
 * @param {array} properties
 * @returns {object} json
 */

// в качестве исходного массива передается массив body объекта ast
const makeJsonFromAst = (properties) => {
  // наш json-объект
  const json = {};
  // обходим каждый элемент массива properties
  for (const node of properties) {
    const { key, value } = node;

    // если элемент имеет свойство value.value, значит, это - примитивное значение - фиксируем
    if (value.value !== undefined) {
      json[key.value] =
        value.type === "NumberLiteral" ? Number(value.value) : value.value;
    }

    // если элемент имеет свойство value.properties, значит, это объект, рекурсивно погружаемся внутрь всех свойств
    if (value.properties) {
      json[key.value] = makeJsonFromAst(value.properties);
    }

    // если элемент имеет свойство value.elements, значит, это массив, фиксируем значения как примитивы, массивы или объекты
    if (value.elements) {
      const array = [];
      for (const node of value.elements) {
        let elem;

        if (node.properties) {
          elem = makeJsonFromAst(node.properties);
          array.push(elem);
          continue;
        }
        if (node.elements) {
          elem = makeJsonFromAst(node.elements);
          array.push(elem);
          continue;
        }
        elem = node.value;
        array.push(elem);
      }
      json[key.value] = array;
    }
  }

  return json;
};

module.exports = { makeJsonFromAst };
