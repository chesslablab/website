import { INPUT_EVENT_TYPE, MARKER_TYPE } from '@chesslablab/cmblab';
import chessboard from './pages/chessboard.js';
import explainPositionModal from './pages/explainPositionModal.js';
import gameActionsDropdown from './pages/gameActionsDropdown.js';
import gameStudyDropdown from './pages/gameStudyDropdown.js';
import sanMovesTable from './pages/sanMovesTable.js';
import openingTable from './pages/openingTable.js';
import progressModal from './pages/progressModal.js';
import * as env from '../env.js';
import * as mode from '../mode.js';
import * as variant from '../variant.js';

export default class SanWebSocket {
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

    gameStudyDropdown.props.ul.children.item(3).addEventListener('click', async (event) => {
      event.preventDefault();
      this.send(`/tutor_fen "${sanMovesTable.props.fen[sanMovesTable.current]}" ${variant.CLASSICAL}`);
    });

    gameActionsDropdown.children.item(0).addEventListener('click', (event) => {
      event.preventDefault();
      this.send('/undo');
    });

    this.socket = null;
  }

  connect() {
    progressModal.props.modal.show();

    return new Promise((resolve, reject) => {
      this.socket = new WebSocket(`${env.WEBSOCKET_SCHEME}://${env.WEBSOCKET_HOST}:${env.WEBSOCKET_PORT}`);

      this.socket.onopen = () => {
        progressModal.props.modal.hide();
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
            if (data['/start'].movetext) {
              chessboard.setPosition(data['/start'].fen[data['/start'].fen.length - 1], true);
              chessboard.props.variant = data['/start'].variant;
              chessboard.props.startPos = data['/start'].startPos;
              sanMovesTable.current = data['/start'].fen.length - 1;
              sanMovesTable.props.movetext = data['/start'].movetext;
              sanMovesTable.props.fen = data['/start'].fen;
              sanMovesTable.mount();
              openingTable.props.movetext = data['/start'].movetext;
              openingTable.mount();
            } else {
              console.log('Invalid SAN movetext, please try again with a different one.');
            }
            break;

          case '/legal' === msg:
            Object.keys(data['/legal'].fen).forEach(key => {
              chessboard.addMarker(MARKER_TYPE.dot, key);
            });
            break;

          case '/play_lan' === msg:
            if (data['/play_lan'].isValid) {
              chessboard.setPosition(data['/play_lan'].fen, true);
              sanMovesTable.current = sanMovesTable.props.fen.length;
              sanMovesTable.props.movetext = data['/play_lan'].movetext;
              sanMovesTable.props.fen = sanMovesTable.props.fen.concat(data['/play_lan'].fen);
              sanMovesTable.mount();
              openingTable.props.movetext = data['/play_lan'].movetext;
              openingTable.mount();
            } else {
              chessboard.setPosition(data['/play_lan'].fen, false);
            }
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

          case '/tutor_fen' === msg:
            explainPositionModal.props.explanation = data['/tutor_fen'];
            explainPositionModal.mount();
            explainPositionModal.props.modal.show();
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
