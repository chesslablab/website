import { COLOR, INPUT_EVENT_TYPE, MARKER_TYPE } from '@chesslablab/cmblab';
import { jwtDecode } from 'jwt-decode';
import chessboard from './layout/chessboard.js';
import infoModal from './layout/infoModal.js';
import openingTable from './layout/openingTable.js';
import sanMovesTable from './layout/sanMovesTable.js';
import createGame from './layout/play/createGame.js';
import copyInviteCode from './layout/play/copyInviteCode.js';
import draw from './layout/play/draw.js';
import enterInviteCode from './layout/play/enterInviteCode.js';
import finishedButtons from './layout/play/finishedButtons.js';
import onlinePlayers from './layout/play/onlinePlayers.js';
import rematch from './layout/play/rematch.js';
import startedButtons from './layout/play/startedButtons.js';
import takeback from './layout/play/takeback.js';
import timerTable from './layout/play/timerTable.js';
import * as action from '../action.js';
import * as env from '../env.js';
import * as mode from '../mode.js';

export default class PlayWebSocket {
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
    startedButtons.children.item(0).addEventListener('click', (event) => {
      event.preventDefault();
      localStorage.setItem('takeback', action.PROPOSE);
      this.send('/takeback propose');
      infoModal.msg('Waiting for the opponent to accept or decline.');
      infoModal.modal.show();
    });
    startedButtons.children.item(1).addEventListener('click', (event) => {
      event.preventDefault();
      localStorage.setItem('draw', action.PROPOSE);
      this.send('/draw propose');
      infoModal.msg('Waiting for the opponent to accept or decline.');
      infoModal.modal.show();
    });
    startedButtons.children.item(2).addEventListener('click', (event) => {
      event.preventDefault();
      this.send('/resign accept');
    });

    finishedButtons.children.item(0).addEventListener('click', (event) => {
      event.preventDefault();
      localStorage.setItem('rematch', action.PROPOSE);
      this.send('/rematch propose');
      infoModal.msg('Waiting for the opponent to accept or decline.');
      infoModal.modal.show();
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

          case 'broadcast' === msg:
            onlinePlayers.domElem(data['broadcast']['onlineGames']);
            break;

          case '/start' === msg:
            if (data['/start'].jwt) {
              copyInviteCode.form.elements['hash'].value = data['/start'].hash;
              const jwtDecoded = jwtDecode(data['/start'].jwt);
              chessboard.setOrientation(jwtDecoded.color);
              chessboard.props.variant = data['/start'].variant;
              chessboard.props.startPos = data['/start'].startPos;
              createGame.modal.hide();
              this.send('/online_games');
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
              this._input(data['/play_lan'].turn);
              timerTable.props = {
                turn: data['/play_lan'].turn,
                w: data['/play_lan'].timer.w,
                b: data['/play_lan'].timer.b
              };
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

          case '/accept' === msg:
            if (data['/accept'].jwt) {
              const jwtDecoded = jwtDecode(data['/accept'].jwt);
              const turn = jwtDecoded.fen.split(' ')[1];
              if (!localStorage.getItem('color')) {
                jwtDecoded.color === COLOR.white
                  ? chessboard.setOrientation(COLOR.black)
                  : chessboard.setOrientation(COLOR.white);
                localStorage.setItem(
                  'color',
                  localStorage.getItem('color') === COLOR.black ? COLOR.white : COLOR.black
                );
              }
              this._input(turn);
              enterInviteCode.modal.hide();
              createGame.modal.hide();
              infoModal.modal.hide();
              localStorage.setItem('hash', data['/accept'].hash);
              timerTable.props = {
                turn: turn,
                w: data['/accept'].timer.w,
                b: data['/accept'].timer.b
              };
              this.send('/online_games');
            }
            break;

          case '/takeback' === msg:
            if (data['/takeback'].action === action.PROPOSE) {
              if (localStorage.getItem('takeback') !== action.PROPOSE) {
                takeback.modal.show();
              }
            } else if (data['/takeback'].action === action.DECLINE) {
              takeback.modal.hide();
              infoModal.modal.hide();
              localStorage.clear();
            } else if (data['/takeback'].action === action.ACCEPT) {
              infoModal.modal.hide();
              localStorage.clear();
            }
            break;

          case '/draw' === msg:
            if (data['/draw'].action === action.PROPOSE) {
              if (localStorage.getItem('draw') !== action.PROPOSE) {
                draw.modal.show();
              }
            } else if (data['/draw'].action === action.DECLINE) {
              draw.modal.hide();
              infoModal.modal.hide();
              localStorage.clear();
            } else if (data['/draw'].action === action.ACCEPT) {
              infoModal.modal.hide();
              localStorage.clear();
            }
            break;

          case '/resign' === msg:
            if (data['/resign'].action === action.ACCEPT) {
              localStorage.clear();
              infoModal.msg('Chess game resigned.');
              infoModal.modal.show();
            }
            break;

          case '/rematch' === msg:
            if (data['/rematch'].action === action.PROPOSE) {
              if (localStorage.getItem('rematch') !== action.PROPOSE) {
                rematch.modal.show();
              }
            } else if (data['/rematch'].action === action.DECLINE) {
              rematch.modal.hide();
              infoModal.modal.hide();
              localStorage.clear();
            } else if (data['/rematch'].action === action.ACCEPT) {
              this.send(`/restart ${localStorage.getItem('hash')}`);
            }
            break;

          case '/restart' === msg:
            if (data['/restart'].jwt) {
              infoModal.modal.hide();
              const jwtDecoded = jwtDecode(data['/restart'].jwt);
              chessboard.setPosition(jwtDecoded.fen);
              sanMovesTable.current = 0;
              sanMovesTable.props = {
                ...sanMovesTable.props,
                movetext: '',
                fen: [
                  jwtDecoded.fen
                ]
              };
              sanMovesTable.domElem();
              openingTable.props = {
                movetext: ''
              };
              openingTable.domElem();
              localStorage.clear();
              localStorage.setItem('hash', data['/restart'].hash);
            }
            break;

          case '/online_games' === msg:
            onlinePlayers.domElem(data['/online_games']);
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

  _input(turn) {
    chessboard.state.inputWhiteEnabled = false;
    chessboard.state.inputBlackEnabled = false;
    if (turn === localStorage.getItem('color')) {
      if (turn === COLOR.white) {
        chessboard.state.inputWhiteEnabled = true;
      } else {
        chessboard.state.inputBlackEnabled = true;
      }
    }
  }
}
