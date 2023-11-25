export class Favorites {
  arr;

  constructor(array) {
    this.arr = array;
  }

  toggle(divComponent) {
    const index = this.arr.indexOf(divComponent);
    if (index !== -1) {
      this.arr.splice(index, 1);
    } else {
      this.arr.push(divComponent);
    }
  }

  isExist(divComponent) {
    return this.arr.includes(divComponent);
  }
}
