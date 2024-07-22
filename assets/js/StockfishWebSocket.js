import { COLOR, MARKER_TYPE } from '@chesslablab/chessboard';
import { Movetext } from '@chesslablab/js-utils';
import AbstractWebSocket from './AbstractWebSocket.js';
import { stockfishPanel } from './pages/StockfishPanel.js';
import * as env from '../env.js';
import * as mode from '../mode.js';
import * as variant from '../variant.js';

export class StockfishWebSocket extends AbstractWebSocket {
  constructor() {
    super();

    stockfishPanel.props.gameActionsDropdown.props.ul.children.item(0).addEventListener('click', (event) => {
      event.preventDefault();
      this.send('/undo');
      this.send('/undo');
    });
  }

  connect() {
    this._progressModal.props.modal.show();

    return new Promise((resolve, reject) => {
      this._socket = new WebSocket(`${env.WEBSOCKET_SCHEME}://${env.WEBSOCKET_HOST}:${env.WEBSOCKET_PORT}`);

      this._socket.onopen = () => {
        this._progressModal.props.modal.hide();
        resolve();
      };

      this._socket.onmessage = (res) => {
        const data = JSON.parse(res.data);
        const msg = Object.keys(data)[0];
        this._response[msg] = data[msg];
        switch (msg) {
          case 'error':
            console.log('Whoops! Something went wrong.');
            break;

          case '/start':
            this._chessboard.setPosition(data[msg].fen, true);
            if (data[msg].color === COLOR.black) {
              this._chessboard.setOrientation(COLOR.black);
            }
            if (data[msg].fen.split(' ')[1] !== data[msg].color) {
              this.send(`/stockfish "{\\"Skill Level\\":${sessionStorage.getItem('skillLevel')}}" "{\\"depth\\":12}"`);
            }
            break;

          case '/legal':
            data[msg].forEach(sq => {
              this._chessboard.addMarker(MARKER_TYPE.dot, sq);
            });
            break;

          case '/play_lan':
            if (data[msg].isValid) {
              this._chessboard.setPosition(data[msg].fen, true);
              stockfishPanel.props.sanMovesBrowser.current = stockfishPanel.props.sanMovesBrowser.props.fen.length;
              stockfishPanel.props.sanMovesBrowser.props.movetext = Movetext.notation(localStorage.getItem('notation'), data[msg].movetext);
              stockfishPanel.props.sanMovesBrowser.props.fen = stockfishPanel.props.sanMovesBrowser.props.fen.concat(data[msg].fen);
              stockfishPanel.props.sanMovesBrowser.mount();
              stockfishPanel.props.openingTable.props.movetext = data[msg].movetext;
              stockfishPanel.props.openingTable.mount();
              if (!this._gameOver(data[msg])) {
                this.send(`/stockfish "{\\"Skill Level\\":${sessionStorage.getItem('skillLevel')}}" "{\\"depth\\":12}"`);
              }
            } else {
              this._chessboard.setPosition(data[msg].fen, false);
            }
            break;

          case '/undo':
            this._chessboard.setPosition(data[msg].fen, true);
            if (!data[msg].movetext) {
              this._chessboard.state.inputWhiteEnabled = true;
              this._chessboard.state.inputBlackEnabled = false;
            }
            stockfishPanel.props.sanMovesBrowser.current -= 1;
            stockfishPanel.props.sanMovesBrowser.props.fen.splice(-1);
            stockfishPanel.props.sanMovesBrowser.props.movetext = Movetext.notation(localStorage.getItem('notation'), data[msg].movetext);
            stockfishPanel.props.sanMovesBrowser.mount();
            stockfishPanel.props.openingTable.props.movetext = data[msg].movetext;
            stockfishPanel.props.openingTable.mount();
            break;

          case '/stockfish':
            this._chessboard.setPosition(data[msg].fen, true);
            stockfishPanel.props.sanMovesBrowser.current = stockfishPanel.props.sanMovesBrowser.props.fen.length;
            stockfishPanel.props.sanMovesBrowser.props.movetext = Movetext.notation(localStorage.getItem('notation'), data[msg].movetext);
            stockfishPanel.props.sanMovesBrowser.props.fen = stockfishPanel.props.sanMovesBrowser.props.fen.concat(data[msg].fen);
            stockfishPanel.props.sanMovesBrowser.mount();
            stockfishPanel.props.openingTable.props.movetext = data[msg].movetext;
            stockfishPanel.props.openingTable.mount();
            this._gameOver(data[msg]);
            break;

          case '/randomizer':
            this._chessboard.state.inputWhiteEnabled = false;
            this._chessboard.state.inputBlackEnabled = false;
            if (data[msg].turn === COLOR.white) {
              this._chessboard.state.inputWhiteEnabled = true;
            } else {
              this._chessboard.state.inputBlackEnabled = true;
            }
            sessionStorage.setItem('skillLevel', 20);
            sessionStorage.setItem('depth', 12);
            const settings = {
              color: data[msg].turn,
              fen: data[msg].fen
            };
            this.send(`/start ${variant.CLASSICAL} ${mode.STOCKFISH} "${JSON.stringify(settings).replace(/"/g, '\\"')}"`);
            break;

          default:
            break;
        }
      };

      this._socket.onclose = (err) => {
        console.log('The connection has been lost, please reload the page.');
        reject(err);
      };

      this._socket.onerror = (err) => {
        console.log('The connection has been lost, please reload the page.');
        reject(err);
      };
    });
  }
}

export const stockfishWebSocket = new StockfishWebSocket();
