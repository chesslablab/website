import { COLOR, FEN, INPUT_EVENT_TYPE, MARKER_TYPE } from '@chesslablab/cmblab';
import { jwtDecode } from 'jwt-decode';
import chessboard from './pages/chessboard.js';
import gameActionsDropdown from './pages/gameActionsDropdown.js';
import infoModal from './pages/infoModal.js';
import progressModal from './pages/progressModal.js';
import sanMovesTable from './pages/sanMovesTable.js';
import copyInviteCodeModal from './pages/play/online/copyInviteCodeModal.js';
import createGameModal from './pages/play/online/createGameModal.js';
import drawModal from './pages/play/online/drawModal.js';
import enterInviteCodeModal from './pages/play/online/enterInviteCodeModal.js';
import finishedButtons from './pages/play/online/finishedButtons.js';
import friendButtons from './pages/play/online/friendButtons.js';
import onlinePlayersModal from './pages/play/online/onlinePlayersModal.js';
import playerButtons from './pages/play/online/playerButtons.js';
import rematchModal from './pages/play/online/rematchModal.js';
import takebackModal from './pages/play/online/takebackModal.js';
import { timerTable, timerTableInterval } from './pages/play/online/timerTable.js';
import * as action from '../action.js';
import * as env from '../env.js';
import * as mode from '../mode.js';

export default class PlayWebSocket {
  _timerTableInterval;

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

    gameActionsDropdown.props.ul.children.item(0).addEventListener('click', (event) => {
      event.preventDefault();
      localStorage.setItem('takeback', action.PROPOSE);
      this.send('/takeback propose');
      infoModal.props.msg = 'Waiting for your opponent to accept or decline.';
      infoModal.mount();
      infoModal.props.modal.show();
    });

    gameActionsDropdown.props.ul.children.item(1).addEventListener('click', (event) => {
      event.preventDefault();
      localStorage.setItem('draw', action.PROPOSE);
      this.send('/draw propose');
      infoModal.props.msg = 'Waiting for your opponent to accept or decline.';
      infoModal.mount();
      infoModal.props.modal.show();
    });

    gameActionsDropdown.props.ul.children.item(2).addEventListener('click', (event) => {
      event.preventDefault();
      this.send('/resign accept');
    });

    finishedButtons.children.item(0).addEventListener('click', (event) => {
      event.preventDefault();
      localStorage.setItem('rematch', action.PROPOSE);
      this.send('/rematch propose');
      infoModal.props.msg = 'Waiting for your opponent to accept or decline.';
      infoModal.mount();
      infoModal.props.modal.show();
    });

    finishedButtons.children.item(1).addEventListener('click', (event) => {
      event.preventDefault();
      chessboard.setPosition(FEN.start, true);
      playerButtons.el.classList.remove('d-none');
      friendButtons.classList.remove('d-none');
      gameActionsDropdown.el.parentNode.parentNode.classList.add('d-none');
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

          case 'broadcast' === msg:
            onlinePlayersModal.props.games = data['broadcast']['onlineGames'];
            onlinePlayersModal.mount();
            break;

          case '/start' === msg:
            if (data['/start'].jwt) {
              copyInviteCodeModal.props.form.elements['hash'].value = data['/start'].hash;
              const jwtDecoded = jwtDecode(data['/start'].jwt);
              chessboard.setPosition(data['/start'].fen, true);
              chessboard.setOrientation(jwtDecoded.color);
              chessboard.props.variant = data['/start'].variant;
              chessboard.props.startPos = data['/start'].startPos;
              createGameModal.modal.hide();
              this.send('/online_games');
              localStorage.setItem('hash', data['/start'].hash);
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
            if (data['/play_lan'].isValid) {
              chessboard.setPosition(data['/play_lan'].fen, true);
              sanMovesTable.current = sanMovesTable.props.fen.length;
              sanMovesTable.props.movetext = data['/play_lan'].movetext;
              sanMovesTable.props.fen = sanMovesTable.props.fen.concat(data['/play_lan'].fen);
              sanMovesTable.mount();
              this._toggleInput(data['/play_lan'].turn);
              timerTable.props = {
                turn: data['/play_lan'].turn,
                w: data['/play_lan'].timer.w,
                b: data['/play_lan'].timer.b
              };
              if (data['/play_lan'].isMate) {
                this._end();
              }
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
            break;

          case '/accept' === msg:
            if (data['/accept'].jwt) {
              const jwtDecoded = jwtDecode(data['/accept'].jwt);
              const turn = jwtDecoded.fen.split(' ')[1];
              chessboard.setPosition(jwtDecoded.fen, true);
              if (!localStorage.getItem('color')) {
                if (jwtDecoded.color === COLOR.white) {
                  chessboard.setOrientation(COLOR.black);
                  localStorage.setItem('color', COLOR.black);
                } else {
                  chessboard.setOrientation(COLOR.white);
                  localStorage.setItem('color', COLOR.white);
                }
              }
              this._toggleInput(turn);
              enterInviteCodeModal.modal.hide();
              createGameModal.modal.hide();
              infoModal.props.modal.hide();
              localStorage.setItem('hash', data['/accept'].hash);
              timerTable.props = {
                turn: turn,
                w: data['/accept'].timer.w,
                b: data['/accept'].timer.b
              };
              this._timerTableInterval = timerTableInterval();
              playerButtons.el.classList.add('d-none');
              friendButtons.classList.add('d-none');
              gameActionsDropdown.el.parentNode.parentNode.classList.remove('d-none');
              this.send('/online_games');
              onlinePlayersModal.props.modal.hide();
            }
            break;

          case '/takeback' === msg:
            if (data['/takeback'].action === action.PROPOSE) {
              if (localStorage.getItem('takeback') !== action.PROPOSE) {
                takebackModal.props.modal.show();
              }
            } else if (data['/takeback'].action === action.DECLINE) {
              takebackModal.props.modal.hide();
              infoModal.props.msg = 'Takeback declined.';
              infoModal.mount();
              infoModal.props.modal.show();
            } else if (data['/takeback'].action === action.ACCEPT) {
              infoModal.props.msg = 'Takeback accepted.';
              infoModal.mount();
              infoModal.props.modal.show();
            }
            localStorage.removeItem('takeback');
            break;

          case '/draw' === msg:
            if (data['/draw'].action === action.PROPOSE) {
              if (localStorage.getItem('draw') !== action.PROPOSE) {
                drawModal.props.modal.show();
              }
            } else if (data['/draw'].action === action.DECLINE) {
              drawModal.props.modal.hide();
              infoModal.props.msg = 'Draw offer declined.';
              infoModal.mount();
              infoModal.props.modal.show();
            } else if (data['/draw'].action === action.ACCEPT) {
              this._end();
              infoModal.props.msg = 'Draw offer accepted.';
              infoModal.mount();
              infoModal.props.modal.show();
            }
            localStorage.removeItem('draw');
            break;

          case '/resign' === msg:
            if (data['/resign'].action === action.ACCEPT) {
              this._end();
              infoModal.props.msg = 'Chess game resigned.';
              infoModal.mount();
              infoModal.props.modal.show();
            }
            break;

          case '/rematch' === msg:
            if (data['/rematch'].action === action.PROPOSE) {
              if (localStorage.getItem('rematch') !== action.PROPOSE) {
                rematchModal.props.modal.show();
              }
            } else if (data['/rematch'].action === action.DECLINE) {
              rematchModal.props.modal.hide();
              infoModal.props.modal.hide();
            } else if (data['/rematch'].action === action.ACCEPT) {
              this.send(`/restart ${localStorage.getItem('hash')}`);
            }
            localStorage.removeItem('rematch');
            break;

          case '/restart' === msg:
            if (data['/restart'].jwt) {
              infoModal.props.modal.hide();
              const jwtDecoded = jwtDecode(data['/restart'].jwt);
              const turn = jwtDecoded.fen.split(' ')[1];
              chessboard.setPosition(jwtDecoded.fen, true);
              this._toggleInput(turn);
              chessboard.view.visualizeInputState();
              sanMovesTable.current = 0;
              sanMovesTable.props.fen = [
                jwtDecoded.fen
              ];
              sanMovesTable.props.movetext = '';
              sanMovesTable.mount();
              timerTable.props = {
                turn: turn,
                w: data['/restart'].timer.w,
                b: data['/restart'].timer.b
              };
              this._timerTableInterval = timerTableInterval();
              localStorage.setItem('hash', data['/restart'].hash);
              playerButtons.el.classList.add('d-none');
              friendButtons.classList.add('d-none');
              gameActionsDropdown.el.classList.remove('d-none');
              finishedButtons.classList.add('d-none');
            }
            break;

          case '/leave' === msg:
            if (data['/leave'].action === action.ACCEPT) {
              this._end();
              finishedButtons.children.item(0).classList.add('d-none');
              infoModal.props.msg = 'Your opponent left the game.';
              infoModal.mount();
              infoModal.props.modal.show();
            }
            break;

          case '/online_games' === msg:
            onlinePlayersModal.props.games = data['/online_games'];
            onlinePlayersModal.mount();
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

  _end() {
    gameActionsDropdown.el.classList.add('d-none');
    finishedButtons.classList.remove('d-none');
    chessboard.state.inputWhiteEnabled = false;
    chessboard.state.inputBlackEnabled = false;
    clearInterval(this._timerTableInterval);
  }

  _toggleInput(turn) {
    chessboard.state.inputWhiteEnabled = false;
    chessboard.state.inputBlackEnabled = false;
    if (turn === localStorage.getItem('color')) {
      if (turn === COLOR.white) {
        chessboard.state.inputWhiteEnabled = true;
      } else {
        chessboard.state.inputBlackEnabled = true;
      }
    }
    chessboard.view.visualizeInputState();
  }
}
