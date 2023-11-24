import { DivComponent } from '../../common/div-component.js';
import './book-list.css';

export class BookList extends DivComponent {
  constructor(appState, state) {
    super();
    this.appState = appState;
    this.state = state;
    this.element.classList.add('book__list');
  }

  render() {
    if (this.state.loading) {
      this.element.innerHTML = `<div class="book-list__loader">Loading...</div>`;
      return this.element;
    }

    this.element.innerHTML = `<h1>Books found - ${this.state.list.length}</h1>`;
    return this.element;
  }
}
