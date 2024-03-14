import { MARKER_TYPE } from '@chesslablab/cmblab';
import chessboard from '../layout/chessboard.js';
import sanMovesTable from '../layout/sanMovesTable.js';
import openingTable from '../layout/openingTable.js';
import startedButtons from '../layout/fen/startedButtons.js';
import * as env from '../../env.js';
import * as mode from '../../mode.js';

export default class ChesslaBlabWebSocket {
  constructor() {
    startedButtons.addEventListener('click', () => {
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
              chessboard.setPosition(data['/start'].fen, true);
              chessboard.props.variant = data['/start'].variant;
              chessboard.props.startPos = data['/start'].startPos;
            } else {
              console.log('Invalid FEN, please try again with a different one.');
            }
            break;

          case '/legal' === msg:
            Object.keys(data['/legal'].fen).forEach(key => {
              chessboard.addMarker(MARKER_TYPE.dot, key);
            });
            break;

          case '/play_lan' === msg:
            chessboard.setPosition(data['/play_lan'].fen, true);
            if (!sanMovesTable.props.fen[sanMovesTable.props.fen.length - 1].startsWith(data['/play_lan'].fen)) {
              let fen = sanMovesTable.props.fen;
              fen.push(data['/play_lan'].fen);
              sanMovesTable.props = {
                ...sanMovesTable.props,
                movetext: data['/play_lan'].movetext,
                fen: fen
              };
              sanMovesTable.current = sanMovesTable.props.fen.length - 1;
              sanMovesTable.domElem();
              openingTable.props = {
                movetext: data['/play_lan'].movetext
              };
              openingTable.domElem();
            }
            break;

          case '/undo' === msg:
            chessboard.setPosition(data['/undo'].fen, true);
            let fen = sanMovesTable.props.fen;
            fen.pop();
            sanMovesTable.props = {
              ...sanMovesTable.props,
              movetext: data['/undo'].movetext,
              fen: fen
            };
            sanMovesTable.domElem();
            openingTable.props = {
              movetext: data['/undo'].movetext
            };
            openingTable.domElem();
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
