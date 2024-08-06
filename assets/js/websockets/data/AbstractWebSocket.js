import { infoModal } from '../../pages/InfoModal.js';
import { progressModal } from '../../pages/ProgressModal.js';

export default class AbstractWebSocket {
  _progressModal;

  _infoModal;

  _socket;

  _response = {};

  constructor() {
    this._progressModal = progressModal;

    this._infoModal = infoModal;

    this._socket = null;
  }

  send(msg) {
    if (this._socket) {
      this._socket.send(msg);
    }
  }

  watchResponse(propName, callback) {
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
