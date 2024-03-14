import { MARKER_TYPE } from '@chesslablab/cmblab';
import * as env from '../../env.js';
import * as mode from '../../mode.js';

export default class ChesslaBlabWebSocket {
  constructor(
    chessboard,
    sanMovesTable,
    openingTable,
    startedButtons
  ) {
    this.chessboard = chessboard;
    this.sanMovesTable = sanMovesTable;
    this.openingTable = openingTable;
    this.startedButtons = startedButtons;

    this.startedButtons.addEventListener('click', () => {
      this.send('/undo');
    });

    this.socket = null;
  }

  connect() {
    console.log('Establishing connection...');

    return new Promise((resolve, reject) => {
      this.socket = new WebSocket(`${env.WEBSOCKET_SCHEME}://${env.WEBSOCKET_HOST}:${env.WEBSOCKET_PORT}`);

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
            if (data['/start'].fen) {
              this.chessboard.setPosition(data['/start'].fen, true);
              this.chessboard.props.variant = data['/start'].variant;
              this.chessboard.props.startPos = data['/start'].startPos;
            } else {
              console.log('Invalid FEN, please try again with a different one.');
            }
            break;

          case '/legal' === msg:
            Object.keys(data['/legal'].fen).forEach(key => {
              this.chessboard.addMarker(MARKER_TYPE.dot, key);
            });
            break;

          case '/play_lan' === msg:
            this.chessboard.setPosition(data['/play_lan'].fen, true);
            if (!this.sanMovesTable.props.fen[this.sanMovesTable.props.fen.length - 1].startsWith(data['/play_lan'].fen)) {
              let fen = this.sanMovesTable.props.fen;
              fen.push(data['/play_lan'].fen);
              this.sanMovesTable.props = {
                ...this.sanMovesTable.props,
                movetext: data['/play_lan'].movetext,
                fen: fen
              };
              this.sanMovesTable.current = this.sanMovesTable.props.fen.length - 1;
              this.sanMovesTable.domElem();
              this.openingTable.props = {
                movetext: data['/play_lan'].movetext
              };
              this.openingTable.domElem();
            }
            break;

          case '/undo' === msg:
            this.chessboard.setPosition(data['/undo'].fen, true);
            let fen = this.sanMovesTable.props.fen;
            fen.pop();
            this.sanMovesTable.props = {
              ...this.sanMovesTable.props,
              movetext: data['/undo'].movetext,
              fen: fen
            };
            this.sanMovesTable.domElem();
            this.openingTable.props = {
              movetext: data['/undo'].movetext
            };
            this.openingTable.domElem();
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

  send(msg) {
    if (this.socket) {
      this.socket.send(msg);
    }
  }
}
