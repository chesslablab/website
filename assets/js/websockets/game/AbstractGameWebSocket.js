import { COLOR, INPUT_EVENT_TYPE, MARKER_TYPE } from '@chesslablab/chessboard';
import AbstractWebSocket from '../AbstractWebSocket.js';
import * as connect from '../../connect.js';
import chessboard from '../../pages/chessboard.js';

export default class AbstractGameWebSocket extends AbstractWebSocket {
  static PORT = 8443;

  chessboard;

  constructor() {
    super();
    this.chessboard = chessboard;
  }

  async connect() {
    await super.connect(`${connect.ws()}:${AbstractGameWebSocket.PORT}`);
    this.socket.onmessage = (res) => {
      const data = JSON.parse(res.data);
      const msg = Object.keys(data)[0];
      this.response[msg] = data[msg];
    };
  }

  inputHandler(event) {
    if (event.type === INPUT_EVENT_TYPE.movingOverSquare) {
      return;
    }
    if (event.type !== INPUT_EVENT_TYPE.moveInputFinished) {
      event.chessboard.removeMarkers(MARKER_TYPE.dot);
      event.chessboard.removeMarkers(MARKER_TYPE.bevel);
    }
    if (event.type === INPUT_EVENT_TYPE.moveInputStarted) {
      this.send('/legal', {
        square: event.square
      });
      return true;
    } else if (event.type === INPUT_EVENT_TYPE.validateMoveInput) {
      this.send('/play_lan', {
        color: event.piece.charAt(0),
        lan: event.squareFrom + event.squareTo
      });
      return true;
    } else if (event.type === INPUT_EVENT_TYPE.moveInputCanceled) {
      /**
       * In Chess960 there are positions where the king can be moved to the
       * same square where it is located in order to castle. Castling is
       * thus possible by double-clicking on the square where the king is
       * currently located.
       */
      const piece = event.chessboard.state.position.getPiece(event.squareFrom);
      if (piece.charAt(1) === 'k' && event.squareTo === null) {
        this.send('/play_lan', {
          color: piece.charAt(0),
          lan: event.squareFrom + event.squareFrom
        });
      }
      return true;
    }
  }

  end() {
    chessboard.state.inputWhiteEnabled = false;
    chessboard.state.inputBlackEnabled = false;
  }
}
