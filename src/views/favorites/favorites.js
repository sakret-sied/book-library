import onChange from 'on-change';
import { AbstractView } from '../../common/view.js';
import { BookList } from '../../components/book-list/book-list.js';

export class FavoritesView extends AbstractView {
  constructor(appState) {
    super();
    this.appState = appState;
    this.appState = onChange(this.appState, this.appStateHook.bind(this));
    this.bookList = new BookList(this.appState, {
      list: this.appState.favorites.list,
    });
    this.setTitle('Favorites');
  }

  destroy() {
    onChange.unsubscribe(this.appState);
  }

  render() {
    this.app.innerHTML = '';
    this.renderMain();
    this.renderHeader();
    this.renderBookList();
  }

  renderBookList() {
    this.bookList.parentState.list = this.appState.favorites.list;
    this.elements.render(AbstractView.BOOK_LIST, this.bookList);
  }

  appStateHook(path) {
    switch (path) {
      case 'favorites':
        this.renderHeader();
        this.renderBookList();
        break;
    }
  }
}
