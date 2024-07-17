import { COLOR, MARKER_TYPE } from '@chesslablab/chessboard';
import { Movetext } from '@chesslablab/jsblab';
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
        switch (true) {
          case 'error' === msg:
            console.log('Whoops! Something went wrong.');
            break;

          case '/start' === msg:
            this._chessboard.setPosition(data['/start'].fen, true);
            if (data['/start'].color === COLOR.black) {
              this._chessboard.setOrientation(COLOR.black);
            }
            if (data['/start'].fen.split(' ')[1] !== data['/start'].color) {
              this.send(`/stockfish "{\\"Skill Level\\":${sessionStorage.getItem('skillLevel')}}" "{\\"depth\\":12}"`);
            }
            break;

          case '/legal' === msg:
            data['/legal'].forEach(sq => {
              this._chessboard.addMarker(MARKER_TYPE.dot, sq);
            });
            break;

          case '/play_lan' === msg:
            if (data['/play_lan'].isValid) {
              this._chessboard.setPosition(data['/play_lan'].fen, true);
              stockfishPanel.props.sanMovesBrowser.current = stockfishPanel.props.sanMovesBrowser.props.fen.length;
              stockfishPanel.props.sanMovesBrowser.props.movetext = Movetext.notation(localStorage.getItem('notation'), data['/play_lan'].movetext);
              stockfishPanel.props.sanMovesBrowser.props.fen = stockfishPanel.props.sanMovesBrowser.props.fen.concat(data['/play_lan'].fen);
              stockfishPanel.props.sanMovesBrowser.mount();
              stockfishPanel.props.openingTable.props.movetext = data['/play_lan'].movetext;
              stockfishPanel.props.openingTable.mount();
              if (!this._gameOver(data['/play_lan'])) {
                this.send(`/stockfish "{\\"Skill Level\\":${sessionStorage.getItem('skillLevel')}}" "{\\"depth\\":12}"`);
              }
            } else {
              this._chessboard.setPosition(data['/play_lan'].fen, false);
            }
            break;

          case '/undo' === msg:
            this._chessboard.setPosition(data['/undo'].fen, true);
            if (!data['/undo'].movetext) {
              this._chessboard.state.inputWhiteEnabled = true;
              this._chessboard.state.inputBlackEnabled = false;
            }
            stockfishPanel.props.sanMovesBrowser.current -= 1;
            stockfishPanel.props.sanMovesBrowser.props.fen.splice(-1);
            stockfishPanel.props.sanMovesBrowser.props.movetext = Movetext.notation(localStorage.getItem('notation'), data['/undo'].movetext);
            stockfishPanel.props.sanMovesBrowser.mount();
            stockfishPanel.props.openingTable.props.movetext = data['/undo'].movetext;
            stockfishPanel.props.openingTable.mount();
            break;

          case '/stockfish' === msg:
            this._chessboard.setPosition(data['/stockfish'].fen, true);
            stockfishPanel.props.sanMovesBrowser.current = stockfishPanel.props.sanMovesBrowser.props.fen.length;
            stockfishPanel.props.sanMovesBrowser.props.movetext = Movetext.notation(localStorage.getItem('notation'), data['/stockfish'].movetext);
            stockfishPanel.props.sanMovesBrowser.props.fen = stockfishPanel.props.sanMovesBrowser.props.fen.concat(data['/stockfish'].fen);
            stockfishPanel.props.sanMovesBrowser.mount();
            stockfishPanel.props.openingTable.props.movetext = data['/stockfish'].movetext;
            stockfishPanel.props.openingTable.mount();
            this._gameOver(data['/stockfish']);
            break;

          case '/randomizer' === msg:
            this._chessboard.state.inputWhiteEnabled = false;
            this._chessboard.state.inputBlackEnabled = false;
            if (data['/randomizer'].turn === COLOR.white) {
              this._chessboard.state.inputWhiteEnabled = true;
            } else {
              this._chessboard.state.inputBlackEnabled = true;
            }
            sessionStorage.setItem('skillLevel', 20);
            sessionStorage.setItem('depth', 12);
            const add = {
              color: data['/randomizer'].turn,
              fen: data['/randomizer'].fen
            };
            this.send(`/start ${variant.CLASSICAL} ${mode.STOCKFISH} "${JSON.stringify(add).replace(/"/g, '\\"')}"`);
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
