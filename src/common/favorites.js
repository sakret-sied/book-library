export class Favorites {
  list;

  constructor(array) {
    this.list = array;
  }

  toggle(bookState) {
    const index = this.list.indexOf(bookState);
    if (index !== -1) {
      this.list.splice(index, 1);
    } else {
      this.list.push(bookState);
    }
  }

  isExist(bookState) {
    return this.list.includes(bookState);
  }
}
