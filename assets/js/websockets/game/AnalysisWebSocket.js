import { MARKER_TYPE } from '@chesslablab/chessboard';
import { Movetext } from '@chesslablab/js-utils';
import GameWebSocket from './GameWebSocket.js';
import { gameForm } from '../../pages/SanForm.js';
import { sanPanel } from '../../pages/SanPanel.js';

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
        sanPanel.props.sanMovesBrowser.current = data.fen.length - 1;
        sanPanel.props.sanMovesBrowser.props.movetext
          = Movetext.notation(localStorage.getItem('notation'), data.movetext);
        sanPanel.props.sanMovesBrowser.props.fen = data.fen;
        sanPanel.props.sanMovesBrowser.mount();
        sanPanel.props.openingTable.props.movetext = data.movetext;
        sanPanel.props.openingTable.mount();
        if (gameForm.el) {
          gameForm.el.querySelector('input[name="fen"]').value = data.fen[0];
          gameForm.el.querySelector('input[name="startPos"]').value = data?.startPos ?? '';
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
        sanPanel.props.sanMovesBrowser.current = sanPanel.props.sanMovesBrowser.props.fen.length;
        sanPanel.props.sanMovesBrowser.props.movetext
          = Movetext.notation(localStorage.getItem('notation'), data.movetext);
        sanPanel.props.sanMovesBrowser.props.fen
          = sanPanel.props.sanMovesBrowser.props.fen.concat(data.fen);
        sanPanel.props.sanMovesBrowser.mount();
        sanPanel.props.openingTable.props.movetext = data.movetext;
        sanPanel.props.openingTable.mount();
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
      sanPanel.props.sanMovesBrowser.current -= 1;
      sanPanel.props.sanMovesBrowser.props.fen.splice(-1);
      sanPanel.props.sanMovesBrowser.props.movetext
        = Movetext.notation(localStorage.getItem('notation'), data.movetext);
      sanPanel.props.sanMovesBrowser.mount();
      sanPanel.props.openingTable.props.movetext = data.movetext;
      sanPanel.props.openingTable.mount();
    })
    .onChange('/tutor_fen', data => {
      sanPanel.props.explainPositionModal.props.explanation = data;
      sanPanel.props.explainPositionModal.mount();
      sanPanel.props.explainPositionModal.props.modal.show();
    });
  }
}

export const analysisWebSocket = new AnalysisWebSocket();
