import boardActionsDropdown from './boardActionsDropdown.js';
import { explainPositionModal } from './ExplainPositionModal.js';
import { gameActionsDropdown } from './GameActionsDropdown.js';
import { gameStudyDropdown } from './GameStudyDropdown.js';
import historyButtons from './historyButtons.js';
import openingTable from './openingTable.js';
import sanMovesBrowser from './sanMovesBrowser.js';
import AbstractComponent from '../AbstractComponent.js';
import { analysisWebSocket } from '../websockets/game/AnalysisWebSocket.js';

export class SanPanel extends AbstractComponent {
  mount() {
    this.props.gameActionsDropdown.props.ul.children.item(0).addEventListener('click', (event) => {
      event.preventDefault();
      analysisWebSocket.send('/undo');
    });

    this.props.gameStudyDropdown.props.ul.children.item(0).addEventListener('click', async (event) => {
      event.preventDefault();
      this.progressModal.props.modal.show();
      const settings = {
        fen: this.props.sanMovesBrowser.props.fen[this.props.sanMovesBrowser.current]
      };
      analysisWebSocket.send(`/tutor_fen "${JSON.stringify(settings).replace(/"/g, '\\"')}"`);
      this.progressModal.props.modal.hide();
    });
  }
}

export const sanPanel = new SanPanel(
  document.getElementById('sanPanel'),
  {
    boardActionsDropdown: boardActionsDropdown,
    gameActionsDropdown: gameActionsDropdown,
    gameStudyDropdown: gameStudyDropdown,
    explainPositionModal: explainPositionModal,
    historyButtons: historyButtons,
    openingTable: openingTable,
    sanMovesBrowser: sanMovesBrowser
  }
);
