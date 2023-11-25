import { DivComponent } from '../../common/div-component.js';
import { Book } from '../book/book.js';
import './book-list.css';

export class BookList extends DivComponent {
  #list;

  constructor(appState, parentState) {
    super();
    this.appState = appState;
    this.parentState = parentState;
    this.element.classList.add('book__list');
    this.#list = new Map();
  }

  render() {
    if (this.parentState.loading) {
      this.element.innerHTML = `<div class="book-list__loader">Loading...</div>`;
      return this.element;
    }

    this.element.innerHTML = `<h1>Books found - ${
      this.parentState.data?.numFound ?? 0
    }</h1>`;
    this.parentState.data.docs.forEach((book, index) => {
      this.#list.set(index, new Book(this.appState, book));
      this.element.append(this.#list.get(index).render(index));
    });
    this.#addEventFavorites();
    return this.element;
  }

  #addEventFavorites() {
    this.element.addEventListener('click', (event) => {
      const button = event.target.closest('button.button__add');
      if (!button) {
        return;
      }
      const id = parseInt(button.closest('.book').dataset.id);
      const divComponent = this.#list.get(id);
      this.appState.favorites.toggle(divComponent);
      divComponent.render(id);
    });
  }
}
