import { COLOR, INPUT_EVENT_TYPE, MARKER_TYPE } from '@chesslablab/chessboard';
import chessboard from './pages/chessboard.js';
import { infoModal } from './pages/InfoModal.js';
import { progressModal } from './pages/ProgressModal.js';

export default class AbstractWebSocket {
  _progressModal;

  _infoModal;

  _chessboard;

  _socket;

  constructor() {
    this._progressModal = progressModal;

    this._infoModal = infoModal;

    this._chessboard = chessboard;

    this._chessboard.enableMoveInput(event => {
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
    });

    this._socket = null;
  }

  send(msg) {
    if (this._socket) {
      this._socket.send(msg);
    }
  }

  _end() {
    chessboard.state.inputWhiteEnabled = false;
    chessboard.state.inputBlackEnabled = false;
  }

  _gameOver(res) {
    if (res.doesWin) {
      this._infoModal.props.msg = "It's a win";
      this._infoModal.mount();
      this._infoModal.props.modal.show();
      this._end();
      return true;
    } else if (res.doesDraw) {
      this._infoModal.props.msg = "It's a draw";
      this._infoModal.mount();
      this._infoModal.props.modal.show();
      this._end();
      return true;
    } else if (res.isMate) {
      this._infoModal.props.msg = res.turn === COLOR.black ? 'White wins' : 'Black wins';
      this._infoModal.mount();
      this._infoModal.props.modal.show();
      this._end();
      return true;
  } else if (res.isStalemate) {
      this._infoModal.props.msg = "Draw by stalemate";
      this._infoModal.mount();
      this._infoModal.props.modal.show();
      this._end();
      return true;
    } else if (res.isFivefoldRepetition) {
      this._infoModal.props.msg = "Draw by fivefold repetition";
      this._infoModal.mount();
      this._infoModal.props.modal.show();
      this._end();
      return true;
    } else if (res.isFiftyMoveDraw) {
      this._infoModal.props.msg = "Draw by the fifty-move rule";
      this._infoModal.mount();
      this._infoModal.props.modal.show();
      this._end();
      return true;
    } else if (res.isDeadPositionDraw) {
      this._infoModal.props.msg = "Draw by dead position";
      this._infoModal.mount();
      this._infoModal.props.modal.show();
      this._end();
      return true;
    }

    return false;
  }
}
