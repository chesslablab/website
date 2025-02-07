import { infoModal } from '../InfoModal.js';
import { progressModal } from '../ProgressModal.js';

export default class AbstractWebSocket {
  socket;
  response;
  infoModal;
  progressModal;
  cli;

  constructor() {
    if (sessionStorage.length > 0) {
      sessionStorage.clear();
    }
    this.socket = null;
    this.response = {};
    this.infoModal = infoModal;
    this.progressModal = progressModal;
    this.cli = {
      data: [
        '/annotations_game',
        '/ranking',
        '/autocomplete_black',
        '/autocomplete_event',
        '/autocomplete_white',
        '/opening',
        '/search'
      ],
      game: [
        '/ascii',
        '/eval_names',
        '/online_games',
        '/undo',
        '/draw',
        '/rematch',
        '/takeback',
        '/accept',
        '/extract',
        '/leave',
        '/legal',
        '/play',
        '/play_lan',
        '/play_rav',
        '/plot',
        '/randomizer',
        '/recognize',
        '/resign',
        '/restart',
        '/start',
        '/stockfish',
        '/tutor_fen',
        '/tutor_good_pgn'
      ],
      binary: [
        '/image'
      ],
      auth: [
        '/totp_refresh',
        '/totp_signin',
        '/totp_signup'
      ]
    };
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

  send(msg, params = null) {
    if (this.socket) {
      if (params) {
        this.socket.send(`${msg} "${JSON.stringify(params).replace(/"/g, '\\"')}"`);
      } else {
        this.socket.send(msg);
      }
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
          }
          callback(value);
        },
      });
    }

    return this;
  }
}
