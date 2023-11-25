import './app.css';
import { Favorites } from './common/favorites.js';
import { MainView } from './views/main/main.js';

class App {
  routes = [{ path: '', view: MainView }];

  appState = {};

  constructor() {
    this.appState.favorites = new Favorites([]);
    window.addEventListener('hashchange', this.route.bind(this));
    this.route();
  }

  route() {
    if (this.currentView) {
      this.currentView.destroy();
    }
    const view = this.routes.find((r) => r.path == location.hash).view;
    this.currentView = new view(this.appState);
    this.currentView.render();
  }
}

new App();
