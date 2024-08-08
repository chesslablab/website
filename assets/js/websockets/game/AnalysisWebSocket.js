import { MARKER_TYPE } from '@chesslablab/chessboard';
import { Movetext } from '@chesslablab/js-utils';
import AbstractGameWebSocket from './AbstractGameWebSocket.js';
import { sanPanel } from '../../pages/SanPanel.js';

export class AnalysisWebSocket extends AbstractGameWebSocket {
  async connect() {
    await super.connect();

    this._socket.onmessage = (res) => {
      const data = JSON.parse(res.data);
      const msg = Object.keys(data)[0];
      this._response[msg] = data[msg];
      switch (msg) {
        case 'error':
          console.log('Whoops! Something went wrong.');
          break;

        case '/start':
          if (this._response[msg].fen) {
            this.chessboard.disableMoveInput();
            this.chessboard.enableMoveInput(event => this.inputHandler(event));
            this.chessboard.setPosition(this._response[msg].fen[this._response[msg].fen.length - 1], true);
            this.chessboard.props.variant = this._response[msg].variant;
            this.chessboard.props.startPos = this._response[msg].startPos;
            sanPanel.props.sanMovesBrowser.current = this._response[msg].fen.length - 1;
            sanPanel.props.sanMovesBrowser.props.movetext
              = Movetext.notation(localStorage.getItem('notation'), this._response[msg].movetext);
            sanPanel.props.sanMovesBrowser.props.fen = this._response[msg].fen;
            sanPanel.props.sanMovesBrowser.mount();
            sanPanel.props.openingTable.props.movetext = this._response[msg].movetext;
            sanPanel.props.openingTable.mount();
          } else {
            this.infoModal.props.msg = "This game could not be started, please try again";
            this.infoModal.mount();
            this.infoModal.props.modal.show();
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
            sanPanel.props.sanMovesBrowser.current = sanPanel.props.sanMovesBrowser.props.fen.length;
            sanPanel.props.sanMovesBrowser.props.movetext
              = Movetext.notation(localStorage.getItem('notation'), this._response[msg].movetext);
            sanPanel.props.sanMovesBrowser.props.fen
              = sanPanel.props.sanMovesBrowser.props.fen.concat(this._response[msg].fen);
            sanPanel.props.sanMovesBrowser.mount();
            sanPanel.props.openingTable.props.movetext = this._response[msg].movetext;
            sanPanel.props.openingTable.mount();
            this._gameOver(this._response[msg]);
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
          sanPanel.props.sanMovesBrowser.current -= 1;
          sanPanel.props.sanMovesBrowser.props.fen.splice(-1);
          sanPanel.props.sanMovesBrowser.props.movetext
            = Movetext.notation(localStorage.getItem('notation'), this._response[msg].movetext);
          sanPanel.props.sanMovesBrowser.mount();
          sanPanel.props.openingTable.props.movetext = this._response[msg].movetext;
          sanPanel.props.openingTable.mount();
          break;

        default:
          break;
      }
    };
  }
}

export const analysisWebSocket = new AnalysisWebSocket();
