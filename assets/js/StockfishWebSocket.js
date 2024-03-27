import { COLOR, INPUT_EVENT_TYPE, MARKER_TYPE } from '@chesslablab/cmblab';
import chessboard from './pages/chessboard.js';
import gameActionsDropdown from './pages/gameActionsDropdown.js';
import openingTable from './pages/openingTable.js';
import progressModal from './pages/progressModal.js';
import sanMovesTable from './pages/sanMovesTable.js';
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

    gameActionsDropdown.children.item(0).addEventListener('click', (event) => {
      event.preventDefault();
      this.send('/undo');
      this.send('/undo');
    });

    this.socket = null;
  }

  connect() {
    progressModal.modal.show();

    return new Promise((resolve, reject) => {
      this.socket = new WebSocket(`${env.WEBSOCKET_SCHEME}://${env.WEBSOCKET_HOST}:${env.WEBSOCKET_PORT}`);

      this.socket.onopen = () => {
        progressModal.modal.hide();
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
              chessboard.setPosition(data['/start'].fen, true);
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
            sanMovesTable.current = sanMovesTable.props.fen.length;
            sanMovesTable.props.movetext = data['/play_lan'].movetext;
            sanMovesTable.props.fen = sanMovesTable.props.fen.concat(data['/play_lan'].fen);
            sanMovesTable.mount();
            openingTable.props.movetext = data['/play_lan'].movetext;
            openingTable.mount();
            this.send(`/stockfish "{\\"Skill Level\\":${localStorage.getItem('skillLevel')}}" "{\\"depth\\":12}"`);
            break;

          case '/undo' === msg:
            chessboard.setPosition(data['/undo'].fen, true);
            if (!data['/undo'].movetext) {
              chessboard.state.inputWhiteEnabled = true;
              chessboard.state.inputBlackEnabled = false;
            }
            sanMovesTable.current -= 1;
            sanMovesTable.props.fen.splice(-1);
            sanMovesTable.props.movetext = data['/undo'].movetext;
            sanMovesTable.mount();
            openingTable.props.movetext = data['/undo'].movetext;
            openingTable.mount();
            break;

          case '/stockfish' === msg:
            chessboard.setPosition(data['/stockfish'].fen, true);
            sanMovesTable.current = sanMovesTable.props.fen.length;
            sanMovesTable.props.movetext = data['/stockfish'].movetext;
            sanMovesTable.props.fen = sanMovesTable.props.fen.concat(data['/stockfish'].fen);
            sanMovesTable.mount();
            openingTable.props.movetext = data['/stockfish'].movetext;
            openingTable.mount();
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
