/**
 * @param {string} url
 * @returns {Promise}
 */

const awaitFunction = async (url) => {
  try {
    const response = await fetch(url);
    const json = await response.json();

    return await json;
  } catch (error) {
    console.log(error);
  }
};
