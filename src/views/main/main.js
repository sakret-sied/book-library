import onChange from 'on-change';
import { DivComponent } from '../../common/div-component.js';
import { AbstractView } from '../../common/view.js';
import { BookList } from '../../components/book-list/book-list.js';
import { Header } from '../../components/header/header.js';
import { Search } from '../../components/search/search.js';

export class MainView extends AbstractView {
  static BOOK_LIST = 'book-list';
  static HEADER = 'header';
  static MAIN = 'main';
  static SEARCH = 'search';

  state = {
    data: undefined,
    loading: false,
    searchQuery: undefined,
    offset: 0,
  };

  constructor(appState) {
    super();
    this.appState = appState;
    this.appState = onChange(this.appState, this.#appStateHook.bind(this));
    this.state = onChange(this.state, this.#stateHook.bind(this));
    this.setTitle('Поиск книг');
  }

  render() {
    this.app.innerHTML = '';
    this.#renderMain();
    this.#renderHeader();
    this.#renderSearch();
  }

  #renderMain() {
    this.elements.render(MainView.MAIN, new DivComponent());
  }

  #renderHeader() {
    this.elements.render(MainView.HEADER, new Header(this.appState));
  }

  #renderSearch() {
    this.elements.render(MainView.SEARCH, new Search(this.state));
  }

  #renderBookList() {
    this.elements.render(
      MainView.BOOK_LIST,
      new BookList(this.appState, this.state),
    );
  }

  #appStateHook(path) {
    switch (path) {
      case 'favorites':
        this.#renderHeader();
        break;
    }
  }

  async #stateHook(path) {
    switch (path) {
      case 'searchQuery':
        this.state.loading = true;
        this.state.data = await this.#loadList(
          this.state.searchQuery,
          this.state.offset,
        );
        this.state.loading = false;
        break;
      case 'loading':
        this.#renderBookList();
        break;
    }
  }

  async #loadList(q, offset) {
    const res = await fetch(
      `https://openlibrary.org/search.json?q=${q}&offset=${offset}`,
    );
    return res.json();
  }
}
