import { Header } from '../components/header/header.js';
import { DivComponent } from './div-component.js';
import { Elements } from './elements.js';

export class AbstractView {
  static BOOK_LIST = 'book-list';
  static HEADER = 'header';
  static MAIN = 'main';
  static SEARCH = 'search';

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

  renderMain() {
    this.elements.render(AbstractView.MAIN, new DivComponent());
  }

  renderHeader() {
    this.elements.render(AbstractView.HEADER, new Header(this.appState));
  }
}
