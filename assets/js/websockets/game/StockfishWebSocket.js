import { COLOR, MARKER_TYPE } from '@chesslablab/chessboard';
import { Movetext } from '@chesslablab/js-utils';
import AbstractGameWebSocket from './AbstractGameWebSocket.js';
import { stockfishPanel } from '../../pages/StockfishPanel.js';
import * as connect from '../../../connect.js';
import * as mode from '../../../mode.js';
import * as variant from '../../../variant.js';

export class StockfishWebSocket extends AbstractGameWebSocket {
  async connect() {
    await super.connect(connect.wsGame());

    this._socket.onmessage = (res) => {
      const data = JSON.parse(res.data);
      const msg = Object.keys(data)[0];
      this._response[msg] = data[msg];
      switch (msg) {
        case 'error':
          console.log('Whoops! Something went wrong.');
          break;

        case '/start':
          this.chessboard.disableMoveInput();
          this.chessboard.enableMoveInput(event => this.inputHandler(event));
          this.chessboard.setPosition(this._response[msg].fen, true);
          if (this._response[msg].color === COLOR.black) {
            this.chessboard.setOrientation(COLOR.black);
          }
          if (this._response[msg].fen.split(' ')[1] !== this._response[msg].color) {
            this.send(`/stockfish "{\\"Skill Level\\":${sessionStorage.getItem('skillLevel')}}" "{\\"depth\\":12}"`);
          }
          break;

        case '/legal':
          this._response[msg].forEach(sq => {
            this.chessboard.addMarker(MARKER_TYPE.dot, sq);
          });
          break;

        case '/play_lan':
          if (this._response[msg].isValid) {
            this.chessboard.setPosition(this._response[msg].fen, true);
            stockfishPanel.props.sanMovesBrowser.current = stockfishPanel.props.sanMovesBrowser.props.fen.length;
            stockfishPanel.props.sanMovesBrowser.props.movetext
              = Movetext.notation(localStorage.getItem('notation'), this._response[msg].movetext);
            stockfishPanel.props.sanMovesBrowser.props.fen
              = stockfishPanel.props.sanMovesBrowser.props.fen.concat(this._response[msg].fen);
            stockfishPanel.props.sanMovesBrowser.mount();
            stockfishPanel.props.openingTable.props.movetext = this._response[msg].movetext;
            stockfishPanel.props.openingTable.mount();
            if (!this._gameOver(this._response[msg])) {
              this.send(`/stockfish "{\\"Skill Level\\":${sessionStorage.getItem('skillLevel')}}" "{\\"depth\\":12}"`);
            }
          } else {
            this.chessboard.setPosition(this._response[msg].fen, false);
          }
          break;

        case '/undo':
          this.chessboard.setPosition(this._response[msg].fen, true);
          if (!this._response[msg].movetext) {
            this.chessboard.state.inputWhiteEnabled = true;
            this.chessboard.state.inputBlackEnabled = false;
          }
          stockfishPanel.props.sanMovesBrowser.current -= 1;
          stockfishPanel.props.sanMovesBrowser.props.fen.splice(-1);
          stockfishPanel.props.sanMovesBrowser.props.movetext
            = Movetext.notation(localStorage.getItem('notation'), this._response[msg].movetext);
          stockfishPanel.props.sanMovesBrowser.mount();
          stockfishPanel.props.openingTable.props.movetext = this._response[msg].movetext;
          stockfishPanel.props.openingTable.mount();
          break;

        case '/stockfish':
          this.chessboard.setPosition(this._response[msg].fen, true);
          stockfishPanel.props.sanMovesBrowser.current = stockfishPanel.props.sanMovesBrowser.props.fen.length;
          stockfishPanel.props.sanMovesBrowser.props.movetext
            = Movetext.notation(localStorage.getItem('notation'), this._response[msg].movetext);
          stockfishPanel.props.sanMovesBrowser.props.fen
            = stockfishPanel.props.sanMovesBrowser.props.fen.concat(this._response[msg].fen);
          stockfishPanel.props.sanMovesBrowser.mount();
          stockfishPanel.props.openingTable.props.movetext = this._response[msg].movetext;
          stockfishPanel.props.openingTable.mount();
          this._gameOver(this._response[msg]);
          break;

        case '/randomizer':
          this.chessboard.state.inputWhiteEnabled = false;
          this.chessboard.state.inputBlackEnabled = false;
          if (this._response[msg].turn === COLOR.white) {
            this.chessboard.state.inputWhiteEnabled = true;
          } else {
            this.chessboard.state.inputBlackEnabled = true;
          }
          sessionStorage.setItem('skillLevel', 20);
          sessionStorage.setItem('depth', 12);
          const settings = {
            color: this._response[msg].turn,
            fen: this._response[msg].fen
          };
          this.send(`/start ${variant.CLASSICAL} ${mode.STOCKFISH} "${JSON.stringify(settings).replace(/"/g, '\\"')}"`);
          break;

        default:
          break;
      }
    };
  }
}

export const stockfishWebSocket = new StockfishWebSocket();
