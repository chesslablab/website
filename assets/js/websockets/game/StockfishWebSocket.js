import { jwtDecode } from 'jwt-decode';
import { COLOR, MARKER_TYPE } from '@chesslablab/chessboard';
import { Movetext } from '@chesslablab/js-utils';
import AbstractGameWebSocket from './AbstractGameWebSocket.js';
import { stockfishPanel } from '../../pages/StockfishPanel.js';
import * as mode from '../../../mode.js';
import * as variant from '../../../variant.js';

export class StockfishWebSocket extends AbstractGameWebSocket {
  constructor() {
    super();
    this.onChange('/start', data => {
      if (data.jwt) {
        this.chessboard.disableMoveInput();
        this.chessboard.enableMoveInput(event => this.inputHandler(event));
        this.chessboard.setPosition(data.fen, true);
        if (data.color === COLOR.black) {
          this.chessboard.setOrientation(COLOR.black);
        }
        if (data.fen.split(' ')[1] !== data.color) {
          const startToken = jwtDecode(data.jwt);
          this.send('/stockfish', {
            options: {
              'Skill Level': startToken.settings.skillLevel
            },
            params: {
              depth: startToken.settings.depth
            }
          });
        }
        sessionStorage.setItem('start_token', data.jwt);
      } else {
        this.infoModal.props.msg = "This game could not be started, please try again with a different one";
        this.infoModal.mount();
        this.infoModal.props.modal.show();
      }
    })
    .onChange('/legal', data => {
      data.forEach(sq => {
        this.chessboard.addMarker(MARKER_TYPE.dot, sq);
      });
    })
    .onChange('/play_lan', data => {
      if (data.isValid) {
        this.chessboard.setPosition(data.fen, true);
        stockfishPanel.props.movesBrowser.current = stockfishPanel.props.movesBrowser.props.fen.length;
        stockfishPanel.props.movesBrowser.props.movetext
          = Movetext.notation(localStorage.getItem('notation'), data.movetext);
        stockfishPanel.props.movesBrowser.props.fen
          = stockfishPanel.props.movesBrowser.props.fen.concat(data.fen);
        stockfishPanel.props.movesBrowser.mount();
        stockfishPanel.props.openingTable.props.movetext = data.movetext;
        stockfishPanel.props.openingTable.mount();
        if (data.end) {
          this.infoModal.props.msg = data.end.msg;
          this.infoModal.mount();
          this.infoModal.props.modal.show();
          this.end();
        } else {
          const startToken = jwtDecode(sessionStorage.getItem('start_token'));
          this.send('/stockfish', {
            options: {
              'Skill Level': startToken.settings.skillLevel
            },
            params: {
              depth: startToken.settings.depth
            }
          });
        }
      } else {
        this.chessboard.setPosition(data.fen, false);
      }
    })
    .onChange('/undo', data => {
      this.chessboard.setPosition(data.fen, true);
      if (!data.movetext) {
        this.chessboard.state.inputWhiteEnabled = true;
        this.chessboard.state.inputBlackEnabled = false;
      }
      stockfishPanel.props.movesBrowser.current -= 1;
      stockfishPanel.props.movesBrowser.props.fen.splice(-1);
      stockfishPanel.props.movesBrowser.props.movetext
        = Movetext.notation(localStorage.getItem('notation'), data.movetext);
      stockfishPanel.props.movesBrowser.mount();
      stockfishPanel.props.openingTable.props.movetext = data.movetext;
      stockfishPanel.props.openingTable.mount();
    })
    .onChange('/stockfish', data => {
      this.chessboard.setPosition(data.fen, true);
      stockfishPanel.props.movesBrowser.current = stockfishPanel.props.movesBrowser.props.fen.length;
      stockfishPanel.props.movesBrowser.props.movetext
        = Movetext.notation(localStorage.getItem('notation'), data.movetext);
      stockfishPanel.props.movesBrowser.props.fen
        = stockfishPanel.props.movesBrowser.props.fen.concat(data.fen);
      stockfishPanel.props.movesBrowser.mount();
      stockfishPanel.props.openingTable.props.movetext = data.movetext;
      stockfishPanel.props.openingTable.mount();
      if (data.end) {
        this.infoModal.props.msg = data.end.msg;
        this.infoModal.mount();
        this.infoModal.props.modal.show();
        this.end();
      }
    })
    .onChange('/randomize', data => {
      this.chessboard.state.inputWhiteEnabled = false;
      this.chessboard.state.inputBlackEnabled = false;
      if (data.turn === COLOR.white) {
        this.chessboard.state.inputWhiteEnabled = true;
      } else {
        this.chessboard.state.inputBlackEnabled = true;
      }
      this.send('/start', {
        variant: variant.CLASSICAL,
        mode: mode.STOCKFISH,
        settings: {
          skillLevel: 20,
          depth: 12,
          color: data.turn,
          fen: data.fen
        }
      });
    });
  }
}

export const stockfishWebSocket = new StockfishWebSocket();
