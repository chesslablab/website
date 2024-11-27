import { gameActionsDropdown } from './GameActionsDropdown.js';
import historyButtons from './historyButtons.js';
import MyBoardActionsDropdown from './MyBoardActionsDropdown.js';
import openingTable from './openingTable.js';
import sanMovesBrowser from './sanMovesBrowser.js';
import BaseComponent from '../BaseComponent.js';
import { stockfishWebSocket } from '../websockets/game/StockfishWebSocket.js';

export class StockfishPanel extends BaseComponent {
  mount() {
    this.props.gameActionsDropdown.props.ul.children.item(0).addEventListener('click', (event) => {
      event.preventDefault();
      stockfishWebSocket.send('/undo');
      stockfishWebSocket.send('/undo');
    });
  }
}

export const stockfishPanel = new StockfishPanel({
  el: document.querySelector('#stockfishPanel'),
  props() {
    return({
      boardActionsDropdown: new MyBoardActionsDropdown(
        document.querySelector('#boardActionsDropdown ul'),
        {
          movesBrowser: sanMovesBrowser
        }
      ),
      gameActionsDropdown: gameActionsDropdown,
      historyButtons: historyButtons,
      openingTable: openingTable,
      movesBrowser: sanMovesBrowser
    });
  }
});
