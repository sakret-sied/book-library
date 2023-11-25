import { DivComponent } from '../../common/div-component.js';
import './book.css';

export class Book extends DivComponent {
  constructor(appState, bookState) {
    super();
    this.appState = appState;
    this.bookState = bookState;
    this.element.classList.add('book');
  }

  render(id) {
    const existInFavorites = this.appState.favorites.isExist(this);
    this.element.dataset.id = id;
    this.element.innerHTML = `
        <div class="book__image">
            <img src="https://covers.openlibrary.org/b/olid/${
              this.bookState.cover_edition_key
            }-M.jpg" alt="Cover image" loading="lazy" />
        </div>
        <div class="book__info">
            <div class="book__tag">${
              this.bookState.subject ? this.bookState.subject[0] : 'None'
            }</div>
            <div class="book__title">${this.bookState.title}</div>
            <div class="book__author">${
              this.bookState.author_name
                ? this.bookState.author_name[0]
                : 'None'
            }</div>
            <div class="book__footer">
                <button class="button__add ${
                  existInFavorites ? 'button__active' : ''
                }">
                    ${
                      existInFavorites
                        ? '<img src="/static/icon/favorite-black.svg" />'
                        : '<img src="/static/icon/favorite-white.svg" />'
                    }
                </button>
            </div>
        </div>
    `;
    return this.element;
  }
}
