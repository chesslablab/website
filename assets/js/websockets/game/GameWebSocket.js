import { COLOR, INPUT_EVENT_TYPE, MARKER_TYPE } from '@chesslablab/chessboard';
import AbstractWebSocket from '../../AbstractWebSocket.js';
import * as connect from '../../connect.js';
import chessboard from '../../pages/chessboard.js';

export default class GameWebSocket extends AbstractWebSocket {
  static PORT = 8443;

  chessboard;

  constructor() {
    super();
    this.chessboard = chessboard;
  }

  async connect() {
    await super.connect(`${connect.ws()}:${GameWebSocket.PORT}`);

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
      const params = {
        square: event.square
      };
      this.send(`/legal "${JSON.stringify(params).replace(/"/g, '\\"')}"`);
      return true;
    } else if (event.type === INPUT_EVENT_TYPE.validateMoveInput) {
      const params = {
        color: event.piece.charAt(0),
        lan: event.squareFrom + event.squareTo
      };
      this.send(`/play_lan "${JSON.stringify(params).replace(/"/g, '\\"')}"`);
      return true;
    }
  }

  gameOver(res) {
    if (res.doesWin) {
      this.infoModal.props.msg = "It's a win";
      this.infoModal.mount();
      this.infoModal.props.modal.show();
      this.end();
      return true;
    } else if (res.doesDraw) {
      this.infoModal.props.msg = "It's a draw";
      this.infoModal.mount();
      this.infoModal.props.modal.show();
      this.end();
      return true;
    } else if (res.isMate) {
      this.infoModal.props.msg = res.turn === COLOR.black ? 'White wins' : 'Black wins';
      this.infoModal.mount();
      this.infoModal.props.modal.show();
      this.end();
      return true;
  } else if (res.isStalemate) {
      this.infoModal.props.msg = "Draw by stalemate";
      this.infoModal.mount();
      this.infoModal.props.modal.show();
      this.end();
      return true;
    } else if (res.isFivefoldRepetition) {
      this.infoModal.props.msg = "Draw by fivefold repetition";
      this.infoModal.mount();
      this.infoModal.props.modal.show();
      this.end();
      return true;
    } else if (res.isFiftyMoveDraw) {
      this.infoModal.props.msg = "Draw by the fifty-move rule";
      this.infoModal.mount();
      this.infoModal.props.modal.show();
      this.end();
      return true;
    } else if (res.isDeadPositionDraw) {
      this.infoModal.props.msg = "Draw by dead position";
      this.infoModal.mount();
      this.infoModal.props.modal.show();
      this.end();
      return true;
    }

    return false;
  }

  end() {
    chessboard.state.inputWhiteEnabled = false;
    chessboard.state.inputBlackEnabled = false;
  }
}
