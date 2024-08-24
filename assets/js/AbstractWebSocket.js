import { trans } from './i18n.js';
import { infoModal } from './InfoModal.js';
import { progressModal } from './ProgressModal.js';

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
        this.infoModal.props.msg = "Whoops! We are experiencing some technical issues";
        this.infoModal.mount();
        this.infoModal.props.modal.show();
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

  onChange(propName, callback) {
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
