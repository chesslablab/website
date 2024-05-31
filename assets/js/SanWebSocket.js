import { MARKER_TYPE } from '@chesslablab/cmblab';
import { Movetext } from '@chesslablab/jsblab';
import AbstractWebSocket from './AbstractWebSocket.js';
import { sanPanel } from './pages/SanPanel.js';
import * as env from '../env.js';
import * as variant from '../variant.js';

export class SanWebSocket extends AbstractWebSocket {
  constructor() {
    super();

    sanPanel.props.gameStudyDropdown.props.ul.children.item(3).addEventListener('click', async (event) => {
      event.preventDefault();
      this._progressModal.props.modal.show();
      try {
        const res = await fetch(`${env.API_SCHEME}://${env.API_HOST}:${env.API_PORT}/${env.API_VERSION}/tutor/fen`, {
          method: 'POST',
          headers: {
            'X-Api-Key': `${env.API_KEY}`
          },
          body: JSON.stringify({
            fen: sanPanel.props.sanMovesBrowser.props.fen[sanPanel.props.sanMovesBrowser.current]
          })
        });
        sanPanel.props.explainPositionModal.props.explanation = await res.json();
        sanPanel.props.explainPositionModal.mount();
        sanPanel.props.explainPositionModal.props.modal.show();
      } catch (error) {
      }
      this._progressModal.props.modal.hide();
    });

    sanPanel.props.gameActionsDropdown.props.ul.children.item(0).addEventListener('click', (event) => {
      event.preventDefault();
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
            if (data['/start'].movetext) {
              this._chessboard.setPosition(data['/start'].fen[data['/start'].fen.length - 1], true);
              this._chessboard.props.variant = data['/start'].variant;
              this._chessboard.props.startPos = data['/start'].startPos;
              sanPanel.props.sanMovesBrowser.current = data['/start'].fen.length - 1;
              sanPanel.props.sanMovesBrowser.props.movetext = Movetext.notation(localStorage.getItem('notation'), data['/start'].movetext);
              sanPanel.props.sanMovesBrowser.props.fen = data['/start'].fen;
              sanPanel.props.sanMovesBrowser.mount();
              sanPanel.props.openingTable.props.movetext = data['/start'].movetext;
              sanPanel.props.openingTable.mount();
            } else {
              this._infoModal.props.msg = "Invalid SAN movetext, please try again";
              this._infoModal.mount();
              this._infoModal.props.modal.show();
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
              sanPanel.props.sanMovesBrowser.current = sanPanel.props.sanMovesBrowser.props.fen.length;
              sanPanel.props.sanMovesBrowser.props.movetext = Movetext.notation(localStorage.getItem('notation'), data['/play_lan'].movetext);
              sanPanel.props.sanMovesBrowser.props.fen = sanPanel.props.sanMovesBrowser.props.fen.concat(data['/play_lan'].fen);
              sanPanel.props.sanMovesBrowser.mount();
              sanPanel.props.openingTable.props.movetext = data['/play_lan'].movetext;
              sanPanel.props.openingTable.mount();
              this._gameOver(data['/play_lan']);
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
            sanPanel.props.sanMovesBrowser.current -= 1;
            sanPanel.props.sanMovesBrowser.props.fen.splice(-1);
            sanPanel.props.sanMovesBrowser.props.movetext = Movetext.notation(localStorage.getItem('notation'), data['/undo'].movetext);
            sanPanel.props.sanMovesBrowser.mount();
            sanPanel.props.openingTable.props.movetext = data['/undo'].movetext;
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

export const sanWebSocket = new SanWebSocket();
