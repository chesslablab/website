import { COLOR, INPUT_EVENT_TYPE, MARKER_TYPE } from '@chesslablab/chessboard';
import AbstractWebSocket from '../AbstractWebSocket.js';
import chessboard from '../../pages/chessboard.js';
import { infoModal } from '../../pages/InfoModal.js';
import * as connect from '../../../connect.js';

export default class AbstractGameWebSocket extends AbstractWebSocket {
  infoModal;

  chessboard;

  constructor() {
    super();
    this.infoModal = infoModal;
    this.chessboard = chessboard;
  }

  async connect(host) {
    await super.connect(host);
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
      this.send(`/legal ${event.square}`);
      return true;
    } else if (event.type === INPUT_EVENT_TYPE.validateMoveInput) {
      this.send(`/play_lan ${event.piece.charAt(0)} ${event.squareFrom}${event.squareTo}`);
      return true;
    }
  }

  _end() {
    chessboard.state.inputWhiteEnabled = false;
    chessboard.state.inputBlackEnabled = false;
  }

  _gameOver(res) {
    if (res.doesWin) {
      this.infoModal.props.msg = "It's a win";
      this.infoModal.mount();
      this.infoModal.props.modal.show();
      this._end();
      return true;
    } else if (res.doesDraw) {
      this.infoModal.props.msg = "It's a draw";
      this.infoModal.mount();
      this.infoModal.props.modal.show();
      this._end();
      return true;
    } else if (res.isMate) {
      this.infoModal.props.msg = res.turn === COLOR.black ? 'White wins' : 'Black wins';
      this.infoModal.mount();
      this.infoModal.props.modal.show();
      this._end();
      return true;
  } else if (res.isStalemate) {
      this.infoModal.props.msg = "Draw by stalemate";
      this.infoModal.mount();
      this.infoModal.props.modal.show();
      this._end();
      return true;
    } else if (res.isFivefoldRepetition) {
      this.infoModal.props.msg = "Draw by fivefold repetition";
      this.infoModal.mount();
      this.infoModal.props.modal.show();
      this._end();
      return true;
    } else if (res.isFiftyMoveDraw) {
      this.infoModal.props.msg = "Draw by the fifty-move rule";
      this.infoModal.mount();
      this.infoModal.props.modal.show();
      this._end();
      return true;
    } else if (res.isDeadPositionDraw) {
      this.infoModal.props.msg = "Draw by dead position";
      this.infoModal.mount();
      this.infoModal.props.modal.show();
      this._end();
      return true;
    }

    return false;
  }
}
