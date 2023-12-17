/**
 * @param {string} input - строка json
 * @returns {array} - массив токенов для дальнейшего построения АСД
 */

// объект с типами токенов
const { TOKEN_TYPES } = require("./tokenTypes");
const { parser } = require("./parser");
// функция создания токенов элементов
const { createToken } = require("./createToken");
const { makeJsonFromAst } = require("./makeJsonFromAst");

// обработка строки-json начинается с функции lexer
// внутри этой функции происходит лексический анализ для дальнейшего построения абстрактного синтаксического дерева
const lexer = (input) => {
  // начальное положение указателя
  let current = 0;
  // массив, куда будут складываться токены
  const tokens = [];
  // регулярные выражения для определения пробела и чисел
  const WHITESPACE = /\s/;
  const NUMBERS = /[0-9]/;

  while (current < input.length) {
    let char = input[current];

    // для каждого элементра строки оздается токен
    if (char === "{") {
      tokens.push(createToken(TOKEN_TYPES.LEFT_BRACE));
      current++;
      continue;
    }

    if (char === "}") {
      tokens.push(createToken(TOKEN_TYPES.RIGHT_BRACE));
      current++;
      continue;
    }

    if (char === "[") {
      tokens.push(createToken(TOKEN_TYPES.LEFT_BRACKET));
      current++;
      continue;
    }

    if (char === "]") {
      tokens.push(createToken(TOKEN_TYPES.RIGHT_BRACKET));
      current++;
      continue;
    }

    if (char === ":") {
      tokens.push(createToken(TOKEN_TYPES.COLON));
      current++;
      continue;
    }

    if (char === ",") {
      tokens.push(createToken(TOKEN_TYPES.COMMA));
      current++;
      continue;
    }

    // если встречаем пробел, передвигаем указатель дальше
    if (WHITESPACE.test(char)) {
      current++;
      continue;
    }

    // если встречаем число, фиксируем его полное значение
    if (NUMBERS.test(char)) {
      let value = "";

      while (NUMBERS.test(char)) {
        value += char;

        char = input[++current];
      }
      tokens.push(createToken(TOKEN_TYPES.NUMBER, value));
      continue;
    }

    // если встречаем кавычки "", значит, это строковое значение, фиксируем его
    if (char === '"') {
      let value = "";

      char = input[++current];
      while (char !== '"') {
        value += char;
        char = input[++current];
      }
      char = input[++current];
      tokens.push(createToken(TOKEN_TYPES.STRING, value));
      continue;
    }

    // фиксируем значение строки true
    if (
      char === "t" &&
      input[current + 1] === "r" &&
      input[current + 2] === "u" &&
      input[current + 3] === "e"
    ) {
      tokens.push(createToken(TOKEN_TYPES.TRUE));
      current += 4;
      continue;
    }
    // фиксируем значение строки false
    if (
      char === "f" &&
      input[current + 1] === "a" &&
      input[current + 2] === "l" &&
      input[current + 3] === "s" &&
      input[current + 4] === "e"
    ) {
      tokens.push(createToken(TOKEN_TYPES.FALSE));
      current += 5;
      continue;
    }
    // фиксируем значение строки null
    if (
      char === "n" &&
      input[current + 1] === "u" &&
      input[current + 2] === "l" &&
      input[current + 3] === "l"
    ) {
      tokens.push(createToken(TOKEN_TYPES.NULL));
      current += 4;
      continue;
    }
    // выбрасываем ошибку, если символ не форматный для json
    throw new TypeError("I dont know what this character is: " + char);
  }

  // возвращаем массив токенов
  return tokens;
};
// далее вызывается функция parser
