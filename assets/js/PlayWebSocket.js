import { COLOR, FEN, INPUT_EVENT_TYPE, MARKER_TYPE } from '@chesslablab/cmblab';
import { jwtDecode } from 'jwt-decode';
import chessboard from './pages/chessboard.js';
import { infoModal } from './pages/InfoModal.js';
import { progressModal } from './pages/ProgressModal.js';
import { copyInviteCodeModal } from './pages/play/online/CopyInviteCodeModal.js';
import { createGameModal } from './pages/play/online/CreateGameModal.js';
import { drawModal } from './pages/play/online/DrawModal.js';
import { enterInviteCodeModal } from './pages/play/online/EnterInviteCodeModal.js';
import { playOnlineButtons } from './pages/play/online/PlayOnlineButtons.js';
import { playPanel } from './pages/play/online/PlayPanel.js';
import { rematchModal } from './pages/play/online/RematchModal.js';
import { takebackModal } from './pages/play/online/TakebackModal.js';
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

    playPanel.props.gameActionsDropdown.props.ul.children.item(0).addEventListener('click', (event) => {
      event.preventDefault();
      sessionStorage.setItem('takeback', action.PROPOSE);
      this.send('/takeback propose');
      infoModal.props.msg = "Waiting for your opponent to accept or decline";
      infoModal.mount();
      infoModal.props.modal.show();
    });

    playPanel.props.gameActionsDropdown.props.ul.children.item(1).addEventListener('click', (event) => {
      event.preventDefault();
      sessionStorage.setItem('draw', action.PROPOSE);
      this.send('/draw propose');
      infoModal.props.msg = "Waiting for your opponent to accept or decline";
      infoModal.mount();
      infoModal.props.modal.show();
    });

    playPanel.props.gameActionsDropdown.props.ul.children.item(2).addEventListener('click', (event) => {
      event.preventDefault();
      this.send('/resign accept');
    });

    playPanel.props.finishedButtons.el.children.item(0).addEventListener('click', (event) => {
      event.preventDefault();
      sessionStorage.setItem('rematch', action.PROPOSE);
      this.send('/rematch propose');
      infoModal.props.msg = "Waiting for your opponent to accept or decline";
      infoModal.mount();
      infoModal.props.modal.show();
    });

    playPanel.props.finishedButtons.el.children.item(1).addEventListener('click', (event) => {
      event.preventDefault();
      chessboard.setPosition(FEN.start, true);
      playOnlineButtons.el.classList.remove('d-none');
      playPanel.el.classList.add('d-none');
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
            playOnlineButtons.props.playersButtons.props.games = data['broadcast']['onlineGames'];
            playOnlineButtons.props.playersButtons.mount();
            break;

          case '/start' === msg:
            if (data['/start'].jwt) {
              copyInviteCodeModal.props.form.elements['hash'].value = data['/start'].hash;
              const jwtDecoded = jwtDecode(data['/start'].jwt);
              chessboard.setPosition(data['/start'].fen, true);
              chessboard.setOrientation(jwtDecoded.color);
              chessboard.props.variant = data['/start'].variant;
              chessboard.props.startPos = data['/start'].startPos;
              createGameModal.props.modal.hide();
              this.send('/online_games');
              sessionStorage.setItem('hash', data['/start'].hash);
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
              playPanel.props.sanMovesBrowser.current = playPanel.props.sanMovesBrowser.props.fen.length;
              playPanel.props.sanMovesBrowser.props.movetext = data['/play_lan'].movetext;
              playPanel.props.sanMovesBrowser.props.fen = playPanel.props.sanMovesBrowser.props.fen.concat(data['/play_lan'].fen);
              playPanel.props.sanMovesBrowser.mount();
              this._toggleInput(data['/play_lan'].turn);
              playPanel.props.timerTable.props = {
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
            playPanel.props.sanMovesBrowser.current -= 1;
            playPanel.props.sanMovesBrowser.props.fen.splice(-1);
            playPanel.props.sanMovesBrowser.props.movetext = data['/undo'].movetext;
            playPanel.props.sanMovesBrowser.mount();
            break;

          case '/accept' === msg:
            if (data['/accept'].jwt) {
              const jwtDecoded = jwtDecode(data['/accept'].jwt);
              const turn = jwtDecoded.fen.split(' ')[1];
              chessboard.setPosition(jwtDecoded.fen, true);
              if (!sessionStorage.getItem('color')) {
                if (jwtDecoded.color === COLOR.white) {
                  chessboard.setOrientation(COLOR.black);
                  sessionStorage.setItem('color', COLOR.black);
                } else {
                  chessboard.setOrientation(COLOR.white);
                  sessionStorage.setItem('color', COLOR.white);
                }
              }
              this._toggleInput(turn);
              enterInviteCodeModal.props.modal.hide();
              createGameModal.props.modal.hide();
              infoModal.props.modal.hide();
              sessionStorage.setItem('hash', data['/accept'].hash);
              playPanel.props.timerTable.props = {
                turn: turn,
                w: data['/accept'].timer.w,
                b: data['/accept'].timer.b
              };
              this._timerTableInterval = playPanel.props.timerTableInterval();
              playOnlineButtons.el.classList.add('d-none');
              playPanel.el.classList.remove('d-none');
              this.send('/online_games');
            } else {
              enterInviteCodeModal.props.modal.hide();
              infoModal.props.msg = "Invalid invite code, please try again";
              infoModal.mount();
              infoModal.props.modal.show();
            }
            break;

          case '/takeback' === msg:
            if (data['/takeback'].action === action.PROPOSE) {
              if (sessionStorage.getItem('takeback') !== action.PROPOSE) {
                takebackModal.props.modal.show();
              }
            } else if (data['/takeback'].action === action.DECLINE) {
              takebackModal.props.modal.hide();
              infoModal.props.msg = "Takeback declined";
              infoModal.mount();
              infoModal.props.modal.show();
            } else if (data['/takeback'].action === action.ACCEPT) {
              infoModal.props.msg = "Takeback accepted";
              infoModal.mount();
              infoModal.props.modal.show();
            }
            sessionStorage.removeItem('takeback');
            break;

          case '/draw' === msg:
            if (data['/draw'].action === action.PROPOSE) {
              if (sessionStorage.getItem('draw') !== action.PROPOSE) {
                drawModal.props.modal.show();
              }
            } else if (data['/draw'].action === action.DECLINE) {
              drawModal.props.modal.hide();
              infoModal.props.msg = "Draw offer declined";
              infoModal.mount();
              infoModal.props.modal.show();
            } else if (data['/draw'].action === action.ACCEPT) {
              this._end();
              infoModal.props.msg = "Draw offer accepted";
              infoModal.mount();
              infoModal.props.modal.show();
            }
            sessionStorage.removeItem('draw');
            break;

          case '/resign' === msg:
            if (data['/resign'].action === action.ACCEPT) {
              this._end();
              infoModal.props.msg = "Your opponent has resigned";
              infoModal.mount();
              infoModal.props.modal.show();
            }
            break;

          case '/rematch' === msg:
            if (data['/rematch'].action === action.PROPOSE) {
              if (sessionStorage.getItem('rematch') !== action.PROPOSE) {
                rematchModal.props.modal.show();
              }
            } else if (data['/rematch'].action === action.DECLINE) {
              rematchModal.props.modal.hide();
              infoModal.props.modal.hide();
            } else if (data['/rematch'].action === action.ACCEPT) {
              this.send(`/restart ${sessionStorage.getItem('hash')}`);
            }
            sessionStorage.removeItem('rematch');
            break;

          case '/restart' === msg:
            if (data['/restart'].jwt) {
              infoModal.props.modal.hide();
              const jwtDecoded = jwtDecode(data['/restart'].jwt);
              const turn = jwtDecoded.fen.split(' ')[1];
              chessboard.setPosition(jwtDecoded.fen, true);
              this._toggleInput(turn);
              chessboard.view.visualizeInputState();
              playPanel.props.sanMovesBrowser.current = 0;
              playPanel.props.sanMovesBrowser.props.fen = [
                jwtDecoded.fen
              ];
              playPanel.props.sanMovesBrowser.props.movetext = '';
              playPanel.props.sanMovesBrowser.mount();
              playPanel.props.timerTable.props = {
                turn: turn,
                w: data['/restart'].timer.w,
                b: data['/restart'].timer.b
              };
              this._timerTableInterval = playPanel.props.timerTableInterval();
              sessionStorage.setItem('hash', data['/restart'].hash);
              playOnlineButtons.el.classList.add('d-none');
              playPanel.props.gameActionsDropdown.el.classList.remove('d-none');
              playPanel.props.finishedButtons.el.classList.add('d-none');
            }
            break;

          case '/leave' === msg:
            if (data['/leave'].action === action.ACCEPT) {
              this._end();
              playPanel.props.finishedButtons.el.children.item(0).classList.add('d-none');
              infoModal.props.msg = "Your opponent is gone";
              infoModal.mount();
              infoModal.props.modal.show();
            }
            break;

          case '/online_games' === msg:
            playOnlineButtons.props.playersButtons.props.games = data['/online_games'];
            playOnlineButtons.props.playersButtons.mount();
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
    playPanel.props.gameActionsDropdown.el.classList.add('d-none');
    playPanel.props.finishedButtons.el.classList.remove('d-none');
    chessboard.state.inputWhiteEnabled = false;
    chessboard.state.inputBlackEnabled = false;
    clearInterval(this._timerTableInterval);
  }

  _toggleInput(turn) {
    chessboard.state.inputWhiteEnabled = false;
    chessboard.state.inputBlackEnabled = false;
    if (turn === sessionStorage.getItem('color')) {
      if (turn === COLOR.white) {
        chessboard.state.inputWhiteEnabled = true;
      } else {
        chessboard.state.inputBlackEnabled = true;
      }
    }
    chessboard.view.visualizeInputState();
  }
}

export const playWebSocket = new PlayWebSocket();
