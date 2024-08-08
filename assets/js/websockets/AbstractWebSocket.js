import * as connect from '../../connect.js';

export default class AbstractWebSocket {
  _socket = null;

  _response = {};

  progressModal;

  connect() {
    return new Promise((resolve, reject) => {
      this.progressModal.props.modal.show();

      this._socket = new WebSocket(connect.wsGame());

      this._socket.onopen = () => {
        this.progressModal.props.modal.hide();
        resolve();
      };

      this._socket.onclose = (err) => {
        console.log('The connection has been lost, please reload the page.');
        reject(err);
      };

      this._socket.onerror = (err) => {
        console.log('The connection has been lost, please reload the page.');
        reject(err);
      };
    });
  }

  send(msg) {
    if (this._socket) {
      this._socket.send(msg);
    }

    return this;
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
            value = newValue;
            callback(newValue);
          }
        },
      });
    }
  }
}
