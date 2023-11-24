import onChange from 'on-change';
import { AbstractView } from '../../common/view.js';
import { Header } from '../../components/header/header.js';
import { Search } from '../../components/search/search.js';
import { BookList } from '../../components/book-list/book-list.js';
import { DivComponent } from '../../common/div-component.js';

export class MainView extends AbstractView {
  static HEADER = 'header';
  static MAIN = 'main';
  static SEARCH = 'search';
  static BOOK_LIST = 'book-list';

  state = {
    list: [],
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
    this.#renderBookList();
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
    if (path === 'favorites') {
      console.log(path);
    }
  }

  async #stateHook(path) {
    if (path === 'searchQuery') {
      this.state.loading = true;
      const data = await this.#loadList(
        this.state.searchQuery,
        this.state.offset,
      );
      this.state.loading = false;
      this.state.list = data.docs;
    }

    if (path === 'list' || path === 'loading') {
      this.#renderBookList();
    }
  }

  async #loadList(q, offset) {
    const res = await fetch(
      `https://openlibrary.org/search.json?q=${q}&offset=${offset}`,
    );
    return res.json();
  }
}
