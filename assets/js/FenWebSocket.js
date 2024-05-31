import { MARKER_TYPE } from '@chesslablab/cmblab';
import { Movetext } from '@chesslablab/jsblab';
import AbstractWebSocket from './AbstractWebSocket.js';
import { fenPanel } from './pages/FenPanel.js';
import * as env from '../env.js';
import * as variant from '../variant.js';

export class FenWebSocket extends AbstractWebSocket {
  constructor() {
    super();

    fenPanel.props.gameStudyDropdown.props.ul.children.item(3).addEventListener('click', async (event) => {
      try {
        event.preventDefault();
        this._progressModal.props.modal.show();
        const res = await fetch(`${env.API_SCHEME}://${env.API_HOST}:${env.API_PORT}/${env.API_VERSION}/tutor/fen`, {
          method: 'POST',
          headers: {
            'X-Api-Key': `${env.API_KEY}`
          },
          body: JSON.stringify({
            fen: fenPanel.props.sanMovesBrowser.props.fen[fenPanel.props.sanMovesBrowser.current]
          })
        });
        fenPanel.props.explainPositionModal.props.explanation = await res.json();
        fenPanel.props.explainPositionModal.mount();
        fenPanel.props.explainPositionModal.props.modal.show();
      } catch (error) {
      } finally {
        this._progressModal.props.modal.hide();
      }
    });

    fenPanel.props.gameActionsDropdown.props.ul.children.item(0).addEventListener('click', (event) => {
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
            if (data['/start'].fen) {
              this._chessboard.setPosition(data['/start'].fen, true);
              this._chessboard.props.variant = data['/start'].variant;
              this._chessboard.props.startPos = data['/start'].startPos;
              fenPanel.props.sanMovesBrowser.current = 0;
              fenPanel.props.sanMovesBrowser.props.fen = [data['/start'].fen];
              fenPanel.props.sanMovesBrowser.mount();
            } else {
              this._infoModal.props.msg = "Invalid FEN string, please try again";
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
              fenPanel.props.sanMovesBrowser.current = fenPanel.props.sanMovesBrowser.props.fen.length;
              fenPanel.props.sanMovesBrowser.props.movetext = Movetext.notation(localStorage.getItem('notation'), data['/play_lan'].movetext);
              fenPanel.props.sanMovesBrowser.props.fen = fenPanel.props.sanMovesBrowser.props.fen.concat(data['/play_lan'].fen);
              fenPanel.props.sanMovesBrowser.mount();
              fenPanel.props.openingTable.props.movetext = data['/play_lan'].movetext;
              fenPanel.props.openingTable.mount();
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
            fenPanel.props.sanMovesBrowser.current -= 1;
            fenPanel.props.sanMovesBrowser.props.fen.splice(-1);
            fenPanel.props.sanMovesBrowser.props.movetext = Movetext.notation(localStorage.getItem('notation'), data['/undo'].movetext);
            fenPanel.props.sanMovesBrowser.mount();
            fenPanel.props.openingTable.props.movetext = data['/undo'].movetext;
            fenPanel.props.openingTable.mount();
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

export const fenWebSocket = new FenWebSocket();
