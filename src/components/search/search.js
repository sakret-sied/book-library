import { DivComponent } from '../../common/div-component.js';
import './search.css';

export class Search extends DivComponent {
  constructor(state) {
    super();
    this.state = state;
    this.element.classList.add('search');
  }

  render() {
    this.element.innerHTML = `
      <div class="search__wrapper">
        <input 
            type="text"
            placeholder="Search book or author..."
            class="search__input"
            value="${this.state.searchQuery ?? ''}"
        />
        <img src="/static/icon/search-black.svg" alt="Search icon" />
      </div>
      <button aria-label="Search">
        <img src="/static/icon/search-white.svg" alt="Search white icon" />
      </button>
    `;
    this.#addEventsToElement();
    return this.element;
  }

  #addEventsToElement() {
    this.element
      .querySelector('button')
      .addEventListener('click', this.#search.bind(this));
    this.element.querySelector('input').addEventListener('keyup', (event) => {
      if (event.code === 'Enter' || event.code === 'NumpadEnter') {
        this.#search();
      }
    });
  }

  #search() {
    const value = this.element.querySelector('input').value;
    this.state.searchQuery = value;
  }
}
