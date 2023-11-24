export class Elements {
  #app;
  #map;

  constructor(app) {
    this.#app = app;
    this.#map = new Map();
  }

  render(name, divComponent) {
    if (!this.#has(name)) {
      this.#set(name, divComponent);
      this.#app.append(this.#get(name)?.element);
    }
    this.#get(name)?.render();
  }

  #has(name) {
    return this.#map.has(name);
  }

  #get(name) {
    return this.#map.get(name);
  }

  #set(name, value) {
    this.#map.set(name, value);
  }
}
