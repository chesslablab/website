import { BoardActionsDropdown, HistoryButtons } from '@chesslablab/js-utils';
import movesMetadataTable from '../../movesMetadataTable.js';
import ravMovesBrowser from '../../ravMovesBrowser.js';
import AbstractComponent from '../../../AbstractComponent.js';

export class RavPanel extends AbstractComponent {
  mount() {
    // do nothing
  }
}

export const ravPanel = new RavPanel(
  document.getElementById('ravPanel'),
  {
    boardActionsDropdown: new BoardActionsDropdown(
      document.querySelector('#boardActionsDropdown ul'),
      {
        movesBrowser: ravMovesBrowser
      }
    ),
    historyButtons: new HistoryButtons(
      document.querySelector('#historyButtons'),
      {
        movesBrowser: ravMovesBrowser
      }
    ),
    movesMetadataTable: movesMetadataTable,
    ravMovesBrowser: ravMovesBrowser
  }
);
