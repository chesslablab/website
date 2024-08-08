import boardActionsDropdown from './boardActionsDropdown.js';
import { gameActionsDropdown } from './GameActionsDropdown.js';
import historyButtons from './historyButtons.js';
import openingTable from './openingTable.js';
import sanMovesBrowser from './sanMovesBrowser.js';
import AbstractComponent from '../AbstractComponent.js';

export class StockfishPanel extends AbstractComponent {
  mount() {
    this.props.gameActionsDropdown.props.ul.children.item(0).addEventListener('click', (event) => {
      event.preventDefault();
      analysisWebSocket.send('/undo');
      analysisWebSocket.send('/undo');
    });
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
