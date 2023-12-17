function toMakeString(space = 0, visited, replacer) {
  const string = [];

  // меняем значения элементов в соответствии с replacer
  for (const propName in this) {
    if (Array.isArray(replacer) && !replacer.includes(propName)) {
      this[propName] = undefined;
    } else if (typeof replacer === "function") {
      this[propName] = replacer(propName, this[propName]);
    }
  }

  // если объект, в котором мы находимся, уже был обработан, значит, существует циклическая ссылка
  if (visited.has(this)) {
    throw new Error("cycle is found");
  } else {
    visited.add(this);
  }

  // обрабатываем значения текущего объекта
  for (const propName in this) {
    // если свойство - объект, но не массив
    if (typeof this[propName] === "object" && !Array.isArray(this[propName])) {
      // добавляем ему функцию преобразования в строку
      this[propName].toMakeString = this.toMakeString;
      // в исходный массив добавляем результат вызова этой функции внутри найденного объекта
      string.push(
        `"${propName}"${" ".repeat(space)}:${" ".repeat(space)}{${this[
          propName
        ].toMakeString(space, visited)}}`
      );
    }
    // если встретили BigInt, выбрасываем ошибку
    if (typeof this[propName] === "bigint") {
      throw new Error("BigInt is found");
    }
    // если свойство - массив, добавляем в исходный массив string результат вызова toMakeStringIfArray
    if (Array.isArray(this[propName])) {
      string.push(
        `"${propName}"${" ".repeat(space)}:${" ".repeat(
          space
        )}${toMakeStringIfArray(this[propName], space, visited)}`
      );
    }

    if (
      this[propName] === Infinity ||
      this[propName] === -Infinity ||
      this[propName] === null
    ) {
      string.push(`"${propName}"${" ".repeat(space)}:${" ".repeat(space)}null`);
    }

    if (
      typeof this[propName] === "boolean" ||
      (typeof this[propName] === "number" && isFinite(this[propName]))
    ) {
      string.push(
        `"${propName}"${" ".repeat(space)}:${" ".repeat(space)}${
          this[propName]
        }`
      );
    }

    if (typeof this[propName] === "string") {
      string.push(
        `"${propName}"${" ".repeat(space)}:${" ".repeat(
          space
        )}${`"${this[propName]}"`}`
      );
    }
  }
  // удаляем добавленное свойство-функцию из текущего объекта
  delete this.toMakeString;

  return `${string.join(`,${" ".repeat(space)}`)}`;
}

const toMakeStringIfArray = (array, space = 0, visited) => {
  const string = [];

  // перебираем в цикле все элементы
  for (const element of array) {
    // если элемент - массив, вызываем рекурсивно функцию и складываем в массив string результат вызова этой функции
    if (Array.isArray(element) && typeof element === "object") {
      string.push(toMakeStringIfArray(element, space, visited));
      // если объект, добавляем ему функцию toMakeString и складываем в массив string результат вызова этой функции
    } else if (typeof element === "object" && element !== null) {
      element.toMakeString = toMakeString;
      string.push(`{${element.toMakeString(space, visited)}}`);
      continue;
    }
    if (element === Infinity || element === -Infinity || element === null) {
      string.push(`null`);
    }

    if (
      typeof element === "boolean" ||
      (typeof element === "number" && isFinite(element))
    ) {
      string.push(`${element}`);
    }

    if (typeof element === "string") {
      string.push(`${`"${element}"`}`);
    }
  }

  return `[${string.join(`,${" ".repeat(space)}`)}]`;
};

// исходная функция преобразования JSON в строку
const stringify = (value, replacer = null, space = 0) => {
  // replacer - функция или массив, передаваемые для заранее заданной обработки пары ключ-значение
  // множество в уже посещенными объектами для предотвращения циклов
  const visited = new Set();
  // создаем свойство у исходного объекта со значением, равным фукнции, преобразующей все значения к строке
  value.toMakeString = toMakeString;

  // возвращаем результат вызова функции
  return `{${value.toMakeString(space, visited, replacer)}}`;
};

const student = {
  name: "John",
  age: 30,
  isAdmin: false,
  id: {
    number: 1,
    friends: {
      1: {
        name: "Andy",
      },
    },
  },
  courses: [
    "html",
    "css",
    "js",
    { course: "js", teachers: [1, 2, 3] },
    null,
    [12],
  ],
  wife: Infinity,

  sayHi() {
    // будет пропущено
  },
  [Symbol("id")]: 123,
  something: undefined,
};

console.log(stringify(student));
// console.log(JSON.stringify(student));
// toDo 1. Describe everything 2. Delete test object
