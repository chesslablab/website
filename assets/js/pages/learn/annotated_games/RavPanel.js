import boardActionsDropdown from './boardActionsDropdown.js';
import historyButtons from './historyButtons.js';
import movesMetadataTable from '../../movesMetadataTable.js';
import ravMovesBrowser from '../../ravMovesBrowser.js';
import AbstractComponent from '../../../AbstractComponent.js';

export class RavPanel extends AbstractComponent {
  mount() {
    // do nothing
  }
}

export const ravPanel = new RavPanel(
  document.getElementById('fenPanel'),
  {
    boardActionsDropdown: boardActionsDropdown,
    historyButtons: historyButtons,
    movesMetadataTable: movesMetadataTable,
    ravMovesBrowser: ravMovesBrowser
  }
);
