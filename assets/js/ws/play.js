import { jwtDecode } from 'jwt-decode';
import {
  COLOR,
  MARKER_TYPE
} from '@chesslablab/cmblab';
import info from '../layout/info.js';
import copyInviteCode from '../layout/play/copyInviteCode.js';
import enterInviteCode from '../layout/play/enterInviteCode.js';
import playOnline from '../layout/play/playOnline.js';
import takeback from '../layout/play/takeback.js';
import draw from '../layout/play/draw.js';
import rematch from '../layout/play/rematch.js';
import * as action from '../../action.js';
import * as env from '../../env.js';
import * as mode from '../../mode.js';

export default class ChesslaBlabWebSocket {
  constructor(
    chessboard,
    sanMovesTable,
    openingTable,
    startedButtons,
    finishedButtons
  ) {
    this.chessboard = chessboard;
    this.sanMovesTable = sanMovesTable;
    this.openingTable = openingTable;
    this.startedButtons = startedButtons;
    this.finishedButtons = finishedButtons;

    this.startedButtons.children.item(0).addEventListener('click', (event) => {
      event.preventDefault();
      localStorage.setItem('takeback', action.PROPOSE);
      this.send('/takeback propose');
      info.msg('Waiting for the opponent to accept or decline.');
      info.modal.show();
    });
    this.startedButtons.children.item(1).addEventListener('click', (event) => {
      event.preventDefault();
      localStorage.setItem('draw', action.PROPOSE);
      this.send('/draw propose');
      info.msg('Waiting for the opponent to accept or decline.');
      info.modal.show();
    });
    this.startedButtons.children.item(2).addEventListener('click', (event) => {
      event.preventDefault();
      this.send('/resign accept');
    });

    this.finishedButtons.children.item(0).addEventListener('click', (event) => {
      event.preventDefault();
      localStorage.setItem('rematch', action.PROPOSE);
      this.send('/rematch propose');
      info.msg('Waiting for the opponent to accept or decline.');
      info.modal.show();
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
            if (data['/start'].jwt) {
              copyInviteCode.form.elements['hash'].value = data['/start'].hash;
              const jwtDecoded = jwtDecode(data['/start'].jwt);
              this.chessboard.setOrientation(jwtDecoded.color);
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
            if (data['/play_lan'].fen) {
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
                this._input(data['/play_lan'].turn);
              }
            }
            break;

          case '/undo' === msg:
            if (data['/undo']) {
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
            }
            break;

          case '/accept' === msg:
            if (data['/accept'].jwt) {
              const jwtDecoded = jwtDecode(data['/accept'].jwt);
              const turn = jwtDecoded.fen.split(' ')[1];
              if (!localStorage.getItem('color')) {
                jwtDecoded.color === COLOR.white
                  ? this.chessboard.setOrientation(COLOR.black)
                  : this.chessboard.setOrientation(COLOR.white);
                localStorage.setItem(
                  'color',
                  localStorage.getItem('color') === COLOR.black ? COLOR.white : COLOR.black
                );
              }
              this._input(turn);
              enterInviteCode.modal.hide();
              playOnline.modal.hide();
              info.modal.hide();
              localStorage.setItem('hash', data['/accept'].hash);
            }
            break;

          case '/online_games' === msg:
            if (data['/online_games']) {
              playOnline.domElem(data['/online_games']);
            }
            break;

          case '/takeback' === msg:
            if (data['/takeback'].action === action.PROPOSE) {
              if (localStorage.getItem('takeback') !== action.PROPOSE) {
                takeback.modal.show();
              }
            } else if (data['/takeback'].action === action.DECLINE) {
              takeback.modal.hide();
              info.modal.hide();
              localStorage.clear();
            } else if (data['/takeback'].action === action.ACCEPT) {
              info.modal.hide();
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
              info.modal.hide();
              localStorage.clear();
            } else if (data['/draw'].action === action.ACCEPT) {
              info.modal.hide();
              localStorage.clear();
            }
            break;

          case '/resign' === msg:
            if (data['/resign'].action === action.ACCEPT) {
              localStorage.clear();
              info.msg('Chess game resigned.');
              info.modal.show();
            }
            break;

          case '/rematch' === msg:
            if (data['/rematch'].action === action.PROPOSE) {
              if (localStorage.getItem('rematch') !== action.PROPOSE) {
                rematch.modal.show();
              }
            } else if (data['/rematch'].action === action.DECLINE) {
              rematch.modal.hide();
              info.modal.hide();
              localStorage.clear();
            } else if (data['/rematch'].action === action.ACCEPT) {
              this.send(`/restart ${localStorage.getItem('hash')}`);
            }
            break;

          case '/restart' === msg:
            if (data['/restart'].jwt) {
              info.modal.hide();
              const jwtDecoded = jwtDecode(data['/restart'].jwt);
              this.chessboard.setPosition(jwtDecoded.fen);
              this.sanMovesTable.current = 0;
              this.sanMovesTable.props = {
                ...this.sanMovesTable.props,
                movetext: '',
                fen: [
                  jwtDecoded.fen
                ]
              };
              this.sanMovesTable.domElem();
              this.openingTable.props = {
                movetext: ''
              };
              this.openingTable.domElem();
              localStorage.clear();
              localStorage.setItem('hash', data['/restart'].hash);
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

  _input(turn) {
    this.chessboard.state.inputWhiteEnabled = false;
    this.chessboard.state.inputBlackEnabled = false;
    if (turn === localStorage.getItem('color')) {
      if (turn === COLOR.white) {
        this.chessboard.state.inputWhiteEnabled = true;
      } else {
        this.chessboard.state.inputBlackEnabled = true;
      }
    }
  }
}
