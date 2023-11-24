import { DivComponent } from '../../common/div-component.js';
import './book-list.css';

export class BookList extends DivComponent {
  constructor(appState, state) {
    super();
    this.appState = appState;
    this.state = state;
  }

  render() {
    if (this.state.loading) {
      this.el.innerHTML = `<div class="book-list__loader">Loading...</div>`;
      return this.el;
    }

    this.el.classList.add('book__list');
    this.el.innerHTML = `<h1>Books found - ${this.state.list.length}</h1>`;
    return this.el;
  }
}
