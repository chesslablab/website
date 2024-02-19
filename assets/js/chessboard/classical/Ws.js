import { MARKER_TYPE } from "../../../vendor/cm-chessboard/src/extensions/markers/Markers.js";
import * as modeConst from '../../../modeConst.js';

export default class Ws {
  constructor(chessboard, sanMovesTable) {
    this.chessboard = chessboard;
    this.sanMovesTable = sanMovesTable;
    this.socket = null;
  }

  connect() {
    console.log('Establishing connection...');

    return new Promise((resolve, reject) => {
      this.socket = new WebSocket('wss://async.chesslablab.org:8443');

      this.socket.onopen = () => {
        console.log('Opened connection!');
        resolve();
      };

      this.socket.onmessage = (res) => {
        const data = JSON.parse(res.data);
        const msg = Object.keys(data)[0];
        switch (true) {
          case 'error' === msg:
            if (data['error']) {
              console.log('Whoops! Something went wrong.');
            }
            break;

          case '/start' === msg:
            if (data['/start'].mode === modeConst.FEN) {
              if (data['/start'].fen) {
                console.log('Started FEN!');
              } else {
                console.log('Invalid FEN, please try again with a different one.');
              }
            }
            break;

          case '/legal' === msg:
            if (data['/legal']) {
              Object.keys(data['/legal'].fen).forEach(key => {
                this.chessboard.addMarker(MARKER_TYPE.dot, key);
              });
            }
            break;

          case '/play_lan' === msg:
            if (data['/play_lan'].fen) {
              let settings = this.sanMovesTable.getSettings();
              let fen = settings.fen;
              fen.push(data['/play_lan'].fen);
              this.chessboard.setPosition(data['/play_lan'].fen, true);
              this.sanMovesTable.setSettings({
                ...settings,
                movetext: data['/play_lan'].movetext,
                fen: fen
              })
              .render();
            }
            break;

          case '/undo' === msg:
            if (data['/undo']) {
              console.log('Undo move!');
            }
            break;

          default:
            break;
        }
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

  send(message) {
    if (this.socket) {
      this.socket.send(message);
    }
  }
}
