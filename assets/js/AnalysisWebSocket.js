import { MARKER_TYPE } from '@chesslablab/chessboard';
import { Movetext } from '@chesslablab/js-utils';
import AbstractWebSocket from './AbstractWebSocket.js';
import { sanPanel } from './pages/SanPanel.js';
import * as env from '../env.js';
import * as variant from '../variant.js';

export class AnalysisWebSocket extends AbstractWebSocket {
  constructor() {
    super();

    sanPanel.props.gameStudyDropdown.props.ul.children.item(3).addEventListener('click', async (event) => {
      try {
        event.preventDefault();
        this._progressModal.props.modal.show();
        const res = await fetch(`${env.API_SCHEME}://${env.API_HOST}:${env.API_PORT}/${env.API_VERSION}/tutor/fen`, {
          method: 'POST',
          body: JSON.stringify({
            fen: sanPanel.props.sanMovesBrowser.props.fen[sanPanel.props.sanMovesBrowser.current]
          })
        });
        sanPanel.props.explainPositionModal.props.explanation = await res.json();
        sanPanel.props.explainPositionModal.mount();
        sanPanel.props.explainPositionModal.props.modal.show();
      } catch (error) {
      } finally {
        this._progressModal.props.modal.hide();
      }
    });

    sanPanel.props.gameStudyDropdown.props.ul.children.item(4).addEventListener('click', async (event) => {
      try {
        event.preventDefault();
        this._progressModal.props.modal.show();
        const res = await fetch(`${env.API_SCHEME}://${env.API_HOST}:${env.API_PORT}/${env.API_VERSION}/tutor/good-move`, {
          method: 'POST',
          body: JSON.stringify({
            fen: sanPanel.props.sanMovesBrowser.props.fen[sanPanel.props.sanMovesBrowser.current]
          })
        });
        const json = await res.json();
        sanPanel.props.explainGoodMoveModal.props.pgn = json.pgn;
        sanPanel.props.explainGoodMoveModal.props.paragraph = json.paragraph;
        sanPanel.props.explainGoodMoveModal.mount();
        sanPanel.props.explainGoodMoveModal.props.modal.show();
      } catch (error) {
      } finally {
        this._progressModal.props.modal.hide();
      }
    });

    sanPanel.props.gameActionsDropdown.props.ul.children.item(0).addEventListener('click', (event) => {
      event.preventDefault();
      this.send('/undo');
    });
  }

  connect() {
    this._progressModal.props.modal.show();

    return new Promise((resolve, reject) => {
      this._socket = new WebSocket(this.host());

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
            if (this._response[msg].fen) {
              this._chessboard.setPosition(this._response[msg].fen[this._response[msg].fen.length - 1], true);
              this._chessboard.props.variant = this._response[msg].variant;
              this._chessboard.props.startPos = this._response[msg].startPos;
              sanPanel.props.sanMovesBrowser.current = this._response[msg].fen.length - 1;
              sanPanel.props.sanMovesBrowser.props.movetext
                = Movetext.notation(localStorage.getItem('notation'), this._response[msg].movetext);
              sanPanel.props.sanMovesBrowser.props.fen = this._response[msg].fen;
              sanPanel.props.sanMovesBrowser.mount();
              sanPanel.props.openingTable.props.movetext = this._response[msg].movetext;
              sanPanel.props.openingTable.mount();
            } else {
              this._infoModal.props.msg = "This game could not be started, please try again";
              this._infoModal.mount();
              this._infoModal.props.modal.show();
            }
            break;

          case '/legal':
            this._response[msg].forEach(sq => {
              this._chessboard.addMarker(MARKER_TYPE.dot, sq);
            });
            break;

          case '/play_lan':
            if (this._response[msg].isValid) {
              this._chessboard.setPosition(this._response[msg].fen, true);
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
              this._chessboard.setPosition(this._response[msg].fen, false);
            }
            break;

          case '/undo':
            this._chessboard.setPosition(this._response[msg].fen, true);
            if (!this._response[msg].movetext) {
              this._chessboard.state.inputWhiteEnabled = true;
              this._chessboard.state.inputBlackEnabled = false;
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

export const analysisWebSocket = new AnalysisWebSocket();
