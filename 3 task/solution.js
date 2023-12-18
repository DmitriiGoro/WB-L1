// функция декоратор для сохранения результатов предыдущих вычислений
// принимает аргумент func - функция вычислений и onlyNumber {boolean},
// если нам нужен не список чисел, а только n-ое

const decorator = (func, onlyNumber = false) => {
  let cache = [];

  return function (n) {
    if (!onlyNumber && cache[n - 1]) {
      // если требуется вернуть список числе до n, возвращаем отфильтрованный кэш-массив
      return cache.filter((number) => number < n);
    } else if (onlyNumber && cache[n - 1]) {
      // если требуется вернуть только n-ое число
      return cache[n - 1];
    }

    const result = func(n);

    cache = result;

    return onlyNumber ? result[n - 1] : result.filter((number) => number < n);
  };
};

const findFiboNumbers = (n) => {
  let prevPrev = 0;
  let prev = 1;
  let cur;

  const fiboNumbers = [prevPrev, prev];

  // итеративный поиск нужного числа Фибоначчи

  for (let i = 2; i <= n; i++) {
    cur = prev + prevPrev;

    prevPrev = prev;
    prev = cur;

    fiboNumbers.push(cur);
  }

  return fiboNumbers;
};

// const findPrimaryNumbers = (n) => {
//   const primaryArray = [];
//   const N = 1000;
//   let limit = N;
//   const isPrimary = new Array(limit).fill(false);

//   let sqrtLimit = Math.floor(Math.sqrt(limit));
//   let x = 1;
//   let y = 1;

//   while (primaryArray.length < n) {
//     for (; x <= sqrtLimit; x++) {
//       for (; y <= sqrtLimit; y++) {
//         x_2 = x ** 2;
//         y_2 = y ** 2;
//         let b = 4 * x_2 + y_2;

//         if (b <= limit && (b % 12 === 1 || b % 12 === 5)) {
//           isPrimary[b] = true;
//         }

//         b -= x_2;

//         if (b <= limit && b % 12 === 7) {
//           isPrimary[b] = true;
//         }

//         b -= 2 * y_2;

//         if (x > y && b <= limit && b % 12 === 11) {
//           isPrimary[b] = true;
//         }
//       }
//     }

//     for (let b = 5; b <= sqrtLimit; b += 2) {
//       if (isPrimary[b]) {
//         let s = b ** 2;

//         for (let k = s; k <= limit; k += s) {
//           isPrimary[k] = false;
//         }
//       }
//     }

//     isPrimary[2] = true;
//     isPrimary[3] = true;

//     for (let i = 0; i < isPrimary.length; i++) {
//       if (isPrimary[i]) {
//         primaryArray.push(i);
//       }
//     }

//     const newNumbers = new Array(limit).fill(false);
//     isPrimary.push(...newNumbers);
//     limit += N;
//     sqrtLimit = Math.floor(Math.sqrt(limit));
//   }

//   return primaryArray;
// };

const findNprimaryNumber = (n) => {
  // список все простых чисел
  const primes = [];
  // количество простых чисел, которые будут найдены за 1 итерацию
  const N = 100;
  // сдвиг количества простых чисел
  let limit = N;
  // массив, индекс которого - число, значение {boolean} является ли индекс простым числом
  const isPrimary = new Array(limit).fill(true);
  // 0 и 1 простыми числами не являются, начинаем с двух
  let i = 2;

  // мы найдем n-ое простое число, когда длина массива простых чисел будет равна n-1
  while (primes.length < n) {
    let p = 2;

    while (p ** 2 <= limit) {
      if (isPrimary[p]) {
        // если число простое, то все его произведения на 2, 3 и т.д. простыми не являются
        for (let j = p ** 2; j < limit + 1; j += p) {
          isPrimary[j] = false;
        }
      }
      p += 1;
    }

    // выбираем простые числа и заполняем массив primes
    for (; i <= isPrimary.length; i++) {
      if (isPrimary[i]) {
        primes.push(i);
      }
    }

    // создаем новый массив, чтобы в дальнейшем увеличить размер isPrimary и продолжить находить простые числа
    const newNumbers = new Array(N).fill(true);

    for (let i = 0; i < newNumbers.length; i++) {
      isPrimary.push(newNumbers[i]);
    }
    // увеличиваем значение
    limit += N;
    // продолжаем общий цикл, пока не найдем нужное n-ое число
  }
  return primes;
};

const fiboNumberUntilN = decorator(findFiboNumbers);
const fiboExactNumber = decorator(findFiboNumbers, true);

const findPrimaryLessN = decorator(findNprimaryNumber);
const findPrimaryN = decorator(findNprimaryNumber, true);
