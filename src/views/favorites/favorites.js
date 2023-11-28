import onChange from 'on-change';
import { AbstractView } from '../../common/view.js';

export class FavoritesView extends AbstractView {
  viewState = {
    list: [],
    numFound: 0,
    offset: 0,
  };

  constructor(appState) {
    super();
    this.appState = appState;
    this.appState = onChange(this.appState, this.appStateHook.bind(this));
    this.viewState.list = this.appState.favorites.list;
    this.updateState();
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

  appStateHook(path) {
    switch (path) {
      case 'favorites':
        this.updateState();
        this.renderHeader();
        this.renderBookList();
        break;
    }
  }

  updateState() {
    this.viewState.numFound = this.appState.favorites.list.length;
  }
}
