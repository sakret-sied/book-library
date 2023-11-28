export class Favorites {
  list;

  constructor(array) {
    this.list = array;
  }

  toggle(book) {
    this.list = this.isExist(book) ? this.remove(book) : this.add(book);
  }

  add(book) {
    this.list.push(book);
    return this.list;
  }

  remove(book) {
    return this.list.filter((element) => element.key !== book.key);
  }

  isExist(book) {
    return this.list.find((element) => element.key === book.key);
  }
}
