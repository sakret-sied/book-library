import onChange from 'on-change';
import { AbstractView } from '../../common/view.js';
import { Search } from '../../components/search/search.js';
import { BookList } from '../../components/book-list/book-list.js';

export class MainView extends AbstractView {
  viewState = {
    list: [],
    numFound: 0,
    loading: false,
    searchQuery: undefined,
    offset: 0,
  };

  constructor(appState) {
    super();
    this.appState = appState;
    this.appState = onChange(this.appState, this.appStateHook.bind(this));
    this.viewState = onChange(this.viewState, this.stateHook.bind(this));
    this.setTitle('Search book');
  }

  destroy() {
    onChange.unsubscribe(this.appState);
    onChange.unsubscribe(this.viewState);
  }

  render() {
    this.app.innerHTML = '';
    this.renderMain();
    this.renderHeader();
    this.renderSearch();
  }

  renderSearch() {
    this.elements.render(AbstractView.SEARCH, new Search(this.viewState));
  }

  renderBookList() {
    this.elements.render(
      AbstractView.BOOK_LIST,
      new BookList(this.appState, this.viewState),
    );
  }

  appStateHook(path) {
    switch (path) {
      case 'favorites':
        this.renderHeader();
        break;
    }
  }

  async stateHook(path) {
    let res;
    switch (path) {
      case 'searchQuery':
        this.viewState.loading = true;
        res = await this.loadList(
          this.viewState.searchQuery,
          this.viewState.offset,
        );
        this.viewState.list = res.docs;
        this.viewState.numFound = res.numFound;
        this.viewState.loading = false;
        break;
      case 'loading':
        this.renderBookList();
        break;
    }
  }

  async loadList(q, offset) {
    const res = await fetch(
      `https://openlibrary.org/search.json?q=${q}&offset=${offset}`,
    );
    return res.json();
  }
}
