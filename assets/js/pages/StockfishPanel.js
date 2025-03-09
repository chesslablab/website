import { HistoryButtons, OpeningTable } from '@chesslablab/js-utils';
import MyBoardActionsDropdown from './MyBoardActionsDropdown.js';
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
      boardActionsDropdown: new MyBoardActionsDropdown({
        el: document.querySelector('#boardActionsDropdown ul'),
        props() {
          return({
            movesBrowser: sanMovesBrowser
          });
        }
      }),
      gameActionsDropdown: new BaseComponent({
        el: document.querySelector('#gameActionsDropdown'),
        props() {
          return({
            ul: this.el.querySelector('ul')
          });
        }
      }),
      historyButtons: new HistoryButtons({
        el: document.querySelector('#historyButtons'),
        props() {
          return({
            movesBrowser: sanMovesBrowser
          });
        }
      }),
      openingTable: new OpeningTable({
        el: document.querySelector('#openingTable tbody'),
        props() {
          return({
            movetext: sanMovesBrowser.props.movetext
          });
        }
      }),
      movesBrowser: sanMovesBrowser
    });
  }
});
