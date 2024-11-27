import { HistoryButtons } from '@chesslablab/js-utils';
import movesMetadataTable from './movesMetadataTable.js';
import MyBoardActionsDropdown from './MyBoardActionsDropdown.js';
import ravMovesBrowser from './ravMovesBrowser.js';
import RootComponent from '../RootComponent.js';
import { binaryWebSocket } from '../websockets/binary/BinaryWebSocket.js';

export class RavPanel extends RootComponent {
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

export const ravPanel = new RavPanel({
  el: document.querySelector('#ravPanel'),
  props() {
    return({
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
    });
  }
});
