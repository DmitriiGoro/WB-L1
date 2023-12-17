/**
 * Функция скачивает изображение и возвращает промис с данными
 * @param {string} url
 * @returns {Promise}
 */

const downloadImg = async (url) => {
  return new Promise((res) => {
    const responce = fetch(url);

    res(responce);
  });
};
