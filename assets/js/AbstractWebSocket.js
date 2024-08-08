import { infoModal } from './InfoModal.js';
import { progressModal } from './ProgressModal.js';
import * as connect from '../connect.js';

export default class AbstractWebSocket {
  socket;
  response;
  infoModal;
  progressModal;

  constructor() {
    this.socket = null;
    this.response = {};
    this.infoModal = infoModal;
    this.progressModal = progressModal;
  }

  connect(host) {
    return new Promise((resolve, reject) => {
      this.progressModal.props.modal.show();

      this.socket = new WebSocket(host);

      this.socket.onopen = () => {
        this.progressModal.props.modal.hide();
        resolve();
      };

      this.socket.onclose = (err) => {
        console.log('The connection has been lost, please reload the page.');
        reject(err);
      };

      this.socket.onerror = (err) => {
        console.log('The connection has been lost, please reload the page.');
        reject(err);
      };
    });
  }

  send(msg) {
    if (this.socket) {
      this.socket.send(msg);
    }

    return this;
  }

  watch(propName, callback) {
    let value = this.response[propName];

    if (!this.response.hasOwnProperty(propName)) {
      Object.defineProperty(this.response, propName, {
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

    return this;
  }
}
