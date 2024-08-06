export default class AbstractWebSocket {
  _socket;

  _response = {};

  constructor() {
    this._socket = null;
  }

  send(msg) {
    if (this._socket) {
      this._socket.send(msg);
    }
  }

  watch(propName, callback) {
    let value = this._response[propName];

    if (!this._response.hasOwnProperty(propName)) {
      Object.defineProperty(this._response, propName, {
        get() {
          return value;
        },
        set(newValue) {
          if (newValue !== value) {
            const oldValue = value;
            value = newValue;
            callback(newValue, oldValue);
          }
        },
      });
    }
  }
}
