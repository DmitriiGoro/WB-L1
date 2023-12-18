// функция подсчета веса одного элемента из localStorage
function computeWeight(key, value) {
  return (
    new TextEncoder().encode(key).length +
    new TextEncoder().encode(value).length
  );
}

// функция подсчета общего объема хранилища
const countTotalVolume = () => {
  if (window.localStorage.getItem("totalVolume")) {
    return;
  }
  let totalVolume = 0;
  const localStorageCopy = {};

  // копирование всех элементов, находящихся в localStorage, для подсчета
  for (let i = 0; i < window.localStorage.length; i++) {
    const key = window.localStorage.key(i);
    const value = window.localStorage.getItem(key);
    localStorageCopy[key] = value;
  }

  try {
    for (let i = 0; i < 1000000; i++) {
      window.localStorage.setItem(i, i);
    }
  } catch (e) {
    for (let j = 0; j < window.localStorage.length; j++) {
      const key = window.localStorage.key(j);
      const element = window.localStorage.getItem(j);

      totalVolume +=
        new TextEncoder().encode(key).length +
        new TextEncoder().encode(element).length;
    }
  }

  window.localStorage.clear();
  // восстановление исходных данных в localStorage
  for (const key in localStorageCopy) {
    window.localStorage.setItem(key, localStorageCopy[key]);
  }
  window.localStorage.setItem("totalVolume", totalVolume);
};
