import { HistoryButtons } from '@chesslablab/js-utils';
import movesMetadataTable from './movesMetadataTable.js';
import MyBoardActionsDropdown from './MyBoardActionsDropdown.js';
import ravMovesBrowser from './ravMovesBrowser.js';
import BaseComponent from '../BaseComponent.js';
import { binaryWebSocket } from '../websockets/binary/BinaryWebSocket.js';

export class RavPanel extends BaseComponent {
  mount() {
    this.props.boardActionsDropdown.el.children.item(3).addEventListener('click', (event) => {
      event.preventDefault();
      binaryWebSocket.send('/image', {
        fen: this.props.movesBrowser.props.fen[this.props.movesBrowser.current],
        flip: this.props.movesBrowser.props.chessboard.getOrientation()
      });
    });
  }
}

export const ravPanel = new RavPanel(
  document.getElementById('ravPanel'),
  {
    boardActionsDropdown: new MyBoardActionsDropdown(
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
    movesBrowser: ravMovesBrowser
  }
);
