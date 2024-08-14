import { MARKER_TYPE } from '@chesslablab/chessboard';
import { Movetext } from '@chesslablab/js-utils';
import GameWebSocket from './GameWebSocket.js';
import { analysisPanel } from '../../pages/AnalysisPanel.js';
import { sanForm } from '../../pages/SanForm.js';

export class AnalysisWebSocket extends GameWebSocket {
  constructor() {
    super();

    this.onChange('/start', data => {
      if (data.fen) {
        this.chessboard.disableMoveInput();
        this.chessboard.enableMoveInput(event => this.inputHandler(event));
        this.chessboard.setPosition(data.fen[data.fen.length - 1], true);
        this.chessboard.props.variant = data.variant;
        this.chessboard.props.startPos = data.startPos;
        analysisPanel.props.sanMovesBrowser.current = data.fen.length - 1;
        analysisPanel.props.sanMovesBrowser.props.movetext
          = Movetext.notation(localStorage.getItem('notation'), data.movetext);
        analysisPanel.props.sanMovesBrowser.props.fen = data.fen;
        analysisPanel.props.sanMovesBrowser.mount();
        analysisPanel.props.openingTable.props.movetext = data.movetext;
        analysisPanel.props.openingTable.mount();
        if (sanForm.el) {
          sanForm.props.fenInput.value = data.fen[0];
          sanForm.props.startPosInput.value = data?.startPos ?? '';
        }
      } else {
        this.infoModal.props.msg = "This game could not be started, please try again";
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
        analysisPanel.props.sanMovesBrowser.current = analysisPanel.props.sanMovesBrowser.props.fen.length;
        analysisPanel.props.sanMovesBrowser.props.movetext
          = Movetext.notation(localStorage.getItem('notation'), data.movetext);
        analysisPanel.props.sanMovesBrowser.props.fen
          = analysisPanel.props.sanMovesBrowser.props.fen.concat(data.fen);
        analysisPanel.props.sanMovesBrowser.mount();
        analysisPanel.props.openingTable.props.movetext = data.movetext;
        analysisPanel.props.openingTable.mount();
        this.gameOver(data);
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
      analysisPanel.props.sanMovesBrowser.current -= 1;
      analysisPanel.props.sanMovesBrowser.props.fen.splice(-1);
      analysisPanel.props.sanMovesBrowser.props.movetext
        = Movetext.notation(localStorage.getItem('notation'), data.movetext);
      analysisPanel.props.sanMovesBrowser.mount();
      analysisPanel.props.openingTable.props.movetext = data.movetext;
      analysisPanel.props.openingTable.mount();
    })
    .onChange('/tutor_fen', data => {
      analysisPanel.props.explainPositionModal.props.explanation = data;
      analysisPanel.props.explainPositionModal.mount();
      analysisPanel.props.explainPositionModal.props.modal.show();
    });
  }
}

export const analysisWebSocket = new AnalysisWebSocket();
