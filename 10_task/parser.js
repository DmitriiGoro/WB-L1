/**
 * Функция создает абстрактное синтаксическое дерево на основе массива токенов
 * @param {array} tokens - массив токенов
 * @returns {object} - АСД
 */

const { TOKEN_TYPES } = require("./tokenTypes");

const parser = (tokens) => {
  // фиксируем начальное положение указателя
  let current = 0;

  // внутренняя функция, которая будет вызываться рекурсивно
  const walk = () => {
    let token = tokens[current];

    // если текущий токен - "{", значит, это объект, начинаем заполнять его
    if (token.type === TOKEN_TYPES.LEFT_BRACE) {
      token = tokens[++current];

      // node текущего объекта
      const node = {
        type: "ObjectExpression",
        properties: [],
      };

      // выполняем цикл, пока не встретим токен "}", что соответствует окончанию чтению значений объекта
      while (token.type !== TOKEN_TYPES.RIGHT_BRACE) {
        const property = {
          type: "Property",
          key: token,
          value: null,
        };

        token = tokens[++current];

        token = tokens[++current];
        property.value = walk();

        node.properties.push(property);

        token = tokens[current];

        // если встречаем запятую, передвигаем указатель
        if (token.type === TOKEN_TYPES.COMMA) {
          token = tokens[++current];
        }
      }

      current++;
      return node;
    }

    if (token.type === TOKEN_TYPES.RIGHT_BRACE) {
      current++;

      return {
        type: "ObjectExpression",
        properties: [],
      };
    }

    // если текущий токен - "[", значит, это массив, начинаем заполнять его
    if (token.type === TOKEN_TYPES.LEFT_BRACKET) {
      token = tokens[++current];

      const node = {
        type: "ArrayExpression",
        elements: [],
      };

      while (token.type !== TOKEN_TYPES.RIGHT_BRACKET) {
        node.elements.push(walk());
        token = tokens[current];

        if (token.type === TOKEN_TYPES.COMMA) {
          token = tokens[++current];
        }
      }

      current++;
      return node;
    }

    if (token.type === TOKEN_TYPES.STRING) {
      current++;
      return {
        type: "StringLiteral",
        value: token.value,
      };
    }

    if (token.type === TOKEN_TYPES.NUMBER) {
      current++;
      return {
        type: "NumberLiteral",
        value: token.value,
      };
    }

    if (token.type === TOKEN_TYPES.TRUE) {
      current++;
      return {
        type: "BooleanLiteral",
        value: true,
      };
    }

    if (token.type === TOKEN_TYPES.FALSE) {
      current++;
      return {
        type: "BooleanLiteral",
        value: false,
      };
    }

    if (token.type === TOKEN_TYPES.NULL) {
      current++;
      return {
        type: "NullLiteral",
        value: null,
      };
    }
    // выбрасываем ошибку, если токен обработать не получилось
    throw new TypeError(token.type);
  };

  // корневой объект АСД
  const ast = {
    type: "Program",
    body: [],
  };
  // начало выполнения функции
  while (current < tokens.length) {
    ast.body.push(walk());
  }

  return ast;
};

module.exports = { parser };

// далее должна быть вызвана функция makeJsonFromAst
