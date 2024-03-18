import { COLOR, INPUT_EVENT_TYPE, MARKER_TYPE } from '@chesslablab/cmblab';
import chessboard from './pages/chessboard.js';
import sanMovesTable from './pages/sanMovesTable.js';
import openingTable from './pages/openingTable.js';
import startedButtons from './pages/startedButtons.js';
import * as env from '../env.js';
import * as mode from '../mode.js';

export default class StockfishWebSocket {
  constructor() {
    chessboard.enableMoveInput((event) => {
      if (event.type === INPUT_EVENT_TYPE.movingOverSquare) {
        return;
      }

      if (event.type !== INPUT_EVENT_TYPE.moveInputFinished) {
        event.chessboard.removeMarkers(MARKER_TYPE.dot);
        event.chessboard.removeMarkers(MARKER_TYPE.bevel);
      }

      if (event.type === INPUT_EVENT_TYPE.moveInputStarted) {
        this.send(`/legal ${event.square}`);
        return true;
      } else if (event.type === INPUT_EVENT_TYPE.validateMoveInput) {
        this.send(`/play_lan ${event.piece.charAt(0)} ${event.squareFrom}${event.squareTo}`);
        return true;
      }
    });

    startedButtons.addEventListener('click', () => {
      this.send('/undo');
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
            console.log('Whoops! Something went wrong.');
            break;

          case '/start' === msg:
            if (data['/start'].fen) {
              // TODO
              if (data['/start'].color === COLOR.black) {
                chessboard.setOrientation(COLOR.black);
              }
            } else {
              if (data['/start'].color === COLOR.black) {
                chessboard.setOrientation(COLOR.black);
                this.send(`/stockfish "{\\"Skill Level\\":${localStorage.getItem('skillLevel')}}" "{\\"depth\\":12}"`);
              }
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
              sanMovesTable.mount();
              sanMovesTable.el.parentNode.parentNode.scrollTop = sanMovesTable.el.parentNode.parentNode.scrollHeight;
              openingTable.props = {
                movetext: data['/play_lan'].movetext
              };
              openingTable.mount();
              this.send(`/stockfish "{\\"Skill Level\\":${localStorage.getItem('skillLevel')}}" "{\\"depth\\":12}"`);
            }
            break;

          case '/undo' === msg:
            chessboard.setPosition(data['/undo'].fen, true);
            sanMovesTable.current -= 1;
            sanMovesTable.props.fen.splice(-1);
            sanMovesTable.props.movetext = data['/undo'].movetext;
            sanMovesTable.mount();
            openingTable.props.movetext = data['/undo'].movetext;
            openingTable.mount();
            break;

          case '/stockfish' === msg:
            if (data['/stockfish']) {
              chessboard.setPosition(data['/stockfish'].fen, true);
              let fen = sanMovesTable.props.fen;
              fen.push(data['/stockfish'].fen);
              sanMovesTable.props = {
                ...sanMovesTable.props,
                movetext: data['/stockfish'].movetext,
                fen: fen
              };
              sanMovesTable.current = sanMovesTable.props.fen.length - 1;
              sanMovesTable.mount();
              sanMovesTable.el.parentNode.parentNode.scrollTop = sanMovesTable.el.parentNode.parentNode.scrollHeight;
              openingTable.props = {
                movetext: data['/stockfish'].movetext
              };
              openingTable.mount();
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

  send(msg) {
    if (this.socket) {
      this.socket.send(msg);
    }
  }
}
