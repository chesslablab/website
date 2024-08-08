import { MARKER_TYPE } from '@chesslablab/chessboard';
import { Movetext } from '@chesslablab/js-utils';
import GameWebSocket from './GameWebSocket.js';
import { sanPanel } from '../../pages/SanPanel.js';

export const analysisWebSocket = new GameWebSocket()
  .watch('/start', data => {
    if (data.fen) {
      analysisWebSocket.chessboard.disableMoveInput();
      analysisWebSocket.chessboard.enableMoveInput(event => analysisWebSocket.inputHandler(event));
      analysisWebSocket.chessboard.setPosition(data.fen[data.fen.length - 1], true);
      analysisWebSocket.chessboard.props.variant = data.variant;
      analysisWebSocket.chessboard.props.startPos = data.startPos;
      sanPanel.props.sanMovesBrowser.current = data.fen.length - 1;
      sanPanel.props.sanMovesBrowser.props.movetext
        = Movetext.notation(localStorage.getItem('notation'), data.movetext);
      sanPanel.props.sanMovesBrowser.props.fen = data.fen;
      sanPanel.props.sanMovesBrowser.mount();
      sanPanel.props.openingTable.props.movetext = data.movetext;
      sanPanel.props.openingTable.mount();
    } else {
      analysisWebSocket.infoModal.props.msg = "This game could not be started, please try again";
      analysisWebSocket.infoModal.mount();
      analysisWebSocket.infoModal.props.modal.show();
    }
  })
  .watch('/legal', data => {
    data.forEach(sq => {
      analysisWebSocket.chessboard.addMarker(MARKER_TYPE.dot, sq);
    });
  })
  .watch('/play_lan', data => {
    if (data.isValid) {
      analysisWebSocket.chessboard.setPosition(data.fen, true);
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
      analysisWebSocket.chessboard.setPosition(data.fen, false);
    }
  })
  .watch('/undo', data => {
    analysisWebSocket.chessboard.setPosition(data.fen, true);
    if (!data.movetext) {
      analysisWebSocket.chessboard.state.inputWhiteEnabled = true;
      analysisWebSocket.chessboard.state.inputBlackEnabled = false;
    }
    sanPanel.props.sanMovesBrowser.current -= 1;
    sanPanel.props.sanMovesBrowser.props.fen.splice(-1);
    sanPanel.props.sanMovesBrowser.props.movetext
      = Movetext.notation(localStorage.getItem('notation'), data.movetext);
    sanPanel.props.sanMovesBrowser.mount();
    sanPanel.props.openingTable.props.movetext = data.movetext;
    sanPanel.props.openingTable.mount();
  })
  .watch('/tutor_fen', data => {
    sanPanel.props.explainPositionModal.props.explanation = data;
    sanPanel.props.explainPositionModal.mount();
    sanPanel.props.explainPositionModal.props.modal.show();
  });
