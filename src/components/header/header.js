import { DivComponent } from '../../common/div-component.js';
import './header.css';

export class Header extends DivComponent {
  constructor(appState) {
    super();
    this.appState = appState;
    this.element.classList.add('header');
  }

  render() {
    this.element.innerHTML = `
      <div>
        <img src="/static/logo.svg" alt="Logo" />
      </div>
      <div class="menu">
        <a class="menu__item" href="#">
          <img src="/static/search.svg" alt="Search icon" />
          Search book
        </a>
        <a class="menu__item" href="#favorites">
          <img src="/static/favorites.svg" alt="Favorites" />
          Favorites
          <div class="menu__item--counter">${this.appState.favorites.length}</div>
        </a>
      </div>
    `;
    return this.element;
  }
}
