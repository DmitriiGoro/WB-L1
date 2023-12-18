/**
 * @param {string} name
 * @param {string} author
 * @param {number} year
 */

const book = {
  name,
  author,
  year,

  getName() {
    return this.name;
  },

  changeName(name) {
    this.name = name;
  },

  getAuthor() {
    return this.author;
  },

  changeAuthor(author) {
    this.author = author;
  },

  getYear() {
    return this.year;
  },

  changeYear(year) {
    this.year = year;
  },
};
