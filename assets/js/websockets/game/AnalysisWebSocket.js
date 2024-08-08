import { MARKER_TYPE } from '@chesslablab/chessboard';
import { Movetext } from '@chesslablab/js-utils';
import AbstractGameWebSocket from './AbstractGameWebSocket.js';
import chessboard from '../../pages/chessboard.js';
import { sanPanel } from '../../pages/SanPanel.js';

export class AnalysisWebSocket extends AbstractGameWebSocket {
}

export const analysisWebSocket = new AnalysisWebSocket()
  .watch('/start', data => {
    if (data.fen) {
      chessboard.disableMoveInput();
      chessboard.enableMoveInput(event => analysisWebSocket.inputHandler(event));
      chessboard.setPosition(data.fen[data.fen.length - 1], true);
      chessboard.props.variant = data.variant;
      chessboard.props.startPos = data.startPos;
      sanPanel.props.sanMovesBrowser.current = data.fen.length - 1;
      sanPanel.props.sanMovesBrowser.props.movetext
        = Movetext.notation(localStorage.getItem('notation'), data.movetext);
      sanPanel.props.sanMovesBrowser.props.fen = data.fen;
      sanPanel.props.sanMovesBrowser.mount();
      sanPanel.props.openingTable.props.movetext = data.movetext;
      sanPanel.props.openingTable.mount();
    } else {
      this.infoModal.props.msg = "This game could not be started, please try again";
      this.infoModal.mount();
      this.infoModal.props.modal.show();
    }
  })
  .watch('/legal', data => {
    data.forEach(sq => {
      chessboard.addMarker(MARKER_TYPE.dot, sq);
    });
  })
  .watch('/play_lan', data => {
    if (data.isValid) {
      chessboard.setPosition(data.fen, true);
      sanPanel.props.sanMovesBrowser.current = sanPanel.props.sanMovesBrowser.props.fen.length;
      sanPanel.props.sanMovesBrowser.props.movetext
        = Movetext.notation(localStorage.getItem('notation'), data.movetext);
      sanPanel.props.sanMovesBrowser.props.fen
        = sanPanel.props.sanMovesBrowser.props.fen.concat(data.fen);
      sanPanel.props.sanMovesBrowser.mount();
      sanPanel.props.openingTable.props.movetext = data.movetext;
      sanPanel.props.openingTable.mount();
      analysisWebSocket.gameOver(data);
    } else {
      chessboard.setPosition(data.fen, false);
    }
  })
  .watch('/undo', data => {
    chessboard.setPosition(data.fen, true);
    if (!data.movetext) {
      chessboard.state.inputWhiteEnabled = true;
      chessboard.state.inputBlackEnabled = false;
    }
    sanPanel.props.sanMovesBrowser.current -= 1;
    sanPanel.props.sanMovesBrowser.props.fen.splice(-1);
    sanPanel.props.sanMovesBrowser.props.movetext
      = Movetext.notation(localStorage.getItem('notation'), data.movetext);
    sanPanel.props.sanMovesBrowser.mount();
    sanPanel.props.openingTable.props.movetext = data.movetext;
    sanPanel.props.openingTable.mount();
  });
