const computeStoreWeight = () => {
  let total = 0;

  for (let i = 0; i < window.localStorage.length; i++) {
    // получаем ключ элемента
    const dataKey = window.localStorage.key(i);
    // получаем значение
    const data = window.localStorage.getItem(dataKey);
    // к общей сумме добавляем вес в байтах ключа и значения
    total +=
      new TextEncoder().encode(data).length +
      new TextEncoder().encode(dataKey).length;
  }
};

function countTotalVolume() {
  let totalVolume = 0;

  // заполняем localStorage элементами до получения ошибки о переполнении
  try {
    for (let i = 0; i < 1000000; i++) {
      window.localStorage.setItem(i, i);
    }
  } catch (e) {
    // после ошибки подсчитываем общий вес элементов
    for (let j = 0; j < window.localStorage.length; j++) {
      const key = window.localStorage.key(j);
      const element = window.localStorage.getItem(j);

      totalVolume +=
        new TextEncoder().encode(key).length +
        new TextEncoder().encode(element).length;
    }
  }
  // очищаем localStorage
  window.localStorage.clear();
  return totalVolume;
}

export { computeStoreWeight, countTotalVolume };
