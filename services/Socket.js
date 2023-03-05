export default class {
  url = '';
  path = '';
  query = {};
  store = null;

  constructor({ url, path, query, store, }) {
    this.setUrl(url);
    this.setPath(path);
    this.setQuery(query);
    this.setStore(store);
  }

  /* ACTIONS */
  async connect() {
    if (!this.url || !this.path) {
      return;
    }

    const uri = `${this.url}${this.path}?${Object.keys(this.query).map(key => key + '=' + this.query[key]).join('&')}`;
    let ws;

    ws = new WebSocket(uri);

    ws.onopen = function (e) {
      console.debug("[Socket][open] Connection success"); // DELETE
    };
    ws.onmessage = function (event) {
      console.debug('[Socket][message]', event.data); // DELETE
    };
    ws.onclose = function (event) {
      if (event.wasClean) {
        console.debug(`[Socket][close] Connection closed cleanly, code=${event.code} reason=${event.reason}`); // DELETE
      } else {
        console.debug('[Socket][close] Connection terminated'); // DELETE

        setTimeout(
          () => { ws = new WebSocket(uri); },
          500
        );
      }

      console.debug("[Socket][close] Connection close"); // DELETE
    };
    ws.onerror = function (error) {
      console.error(`[Socket][error] ${error.message}`); // DELETE
    };
  }

  /* SETTERS */
  async setUrl(url) {
    this.url = url ? url : this.url;
  }
  async setPath(path) {
    this.path = path ? path : this.path;
  }
  async setQuery(query) {
    this.query = query ? query : this.query;
  }
  async setStore(store) {
    this.store = store ? store : this.store;
  }
}
