import AbstractComponent from '../AbstractComponent.js';
import boardActionsDropdown from './boardActionsDropdown.js';
import { gameActionsDropdown } from './GameActionsDropdown.js';
import historyButtons from './historyButtons.js';
import openingTable from './openingTable.js';
import sanMovesBrowser from './sanMovesBrowser.js';

export class StockfishPanel extends AbstractComponent {
  mount() {
    // do nothing
  }
}

export const stockfishPanel = new StockfishPanel(
  document.getElementById('sanPanel'),
  {
    boardActionsDropdown: boardActionsDropdown,
    gameActionsDropdown: gameActionsDropdown,
    historyButtons: historyButtons,
    openingTable: openingTable,
    sanMovesBrowser: sanMovesBrowser
  }
);
