import { DivComponent } from '../../common/div-component.js';
import './search.css';

export class Search extends DivComponent {
  constructor(state) {
    super();
    this.state = state;
  }

  render() {
    this.el.classList.add('search');
    this.el.innerHTML = `
      <div class="search__wrapper">
        <input 
            type="text"
            placeholder="Search book or author..."
            class="search__input"
            value="${this.state.searchQuery ?? ''}"
        />
        <img src="/static/search.svg" alt="Search icon" />
      </div>
      <button aria-label="Search">
        <img src="/static/search-white.svg" alt="Search white icon" />
      </button>
    `;
    this.el
      .querySelector('button')
      .addEventListener('click', this.#search.bind(this));
    this.el.querySelector('input').addEventListener('keyup', (event) => {
      if (event.code === 'Enter' || event.code === 'NumpadEnter') {
        this.#search();
      }
    });
    return this.el;
  }

  #search() {
    const value = this.el.querySelector('input').value;
    this.state.searchQuery = value;
  }
}
