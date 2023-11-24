import { Elements } from './elements.js';

export class AbstractView {
  constructor() {
    this.app = document.querySelector('#root');
    this.elements = new Elements(this.app);
  }

  setTitle(title) {
    document.title = title;
  }

  render() {
    return;
  }

  destroy() {
    return;
  }
}
