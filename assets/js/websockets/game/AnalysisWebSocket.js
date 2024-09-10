import { MARKER_TYPE } from '@chesslablab/chessboard';
import { Movetext } from '@chesslablab/js-utils';
import AbstractGameWebSocket from './AbstractGameWebSocket.js';
import { analysisPanel } from '../../pages/AnalysisPanel.js';
import { sanForm } from '../../pages/SanForm.js';

export class AnalysisWebSocket extends AbstractGameWebSocket {
  constructor() {
    super();

    this.onChange('/start', data => {
      if (data.fen) {
        this.chessboard.disableMoveInput();
        this.chessboard.enableMoveInput(event => this.inputHandler(event));
        this.chessboard.setPosition(data.fen[data.fen.length - 1], true);
        this.chessboard.props.variant = data.variant;
        this.chessboard.props.startPos = data.startPos;
        analysisPanel.props.movesBrowser.current = data.fen.length - 1;
        analysisPanel.props.movesBrowser.props.movetext
          = Movetext.notation(localStorage.getItem('notation'), data.movetext);
        analysisPanel.props.movesBrowser.props.fen = data.fen;
        analysisPanel.props.movesBrowser.mount();
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
        analysisPanel.props.movesBrowser.current = analysisPanel.props.movesBrowser.props.fen.length;
        analysisPanel.props.movesBrowser.props.movetext
          = Movetext.notation(localStorage.getItem('notation'), data.movetext);
        analysisPanel.props.movesBrowser.props.fen
          = analysisPanel.props.movesBrowser.props.fen.concat(data.fen);
        analysisPanel.props.movesBrowser.mount();
        analysisPanel.props.openingTable.props.movetext = data.movetext;
        analysisPanel.props.openingTable.mount();
        if (data.end?.msg) {
          this.infoModal.props.msg = data.end.msg;
          this.infoModal.mount();
          this.infoModal.props.modal.show();
          this.end();
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
      analysisPanel.props.movesBrowser.current -= 1;
      analysisPanel.props.movesBrowser.props.fen.splice(-1);
      analysisPanel.props.movesBrowser.props.movetext
        = Movetext.notation(localStorage.getItem('notation'), data.movetext);
      analysisPanel.props.movesBrowser.mount();
      analysisPanel.props.openingTable.props.movetext = data.movetext;
      analysisPanel.props.openingTable.mount();
    });
  }
}

export const analysisWebSocket = new AnalysisWebSocket();
