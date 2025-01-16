import { FEN } from '@chesslablab/chessboard';
import { HistoryButtons, RavMovesFactory } from '@chesslablab/js-utils';
import chessboard from './chessboard.js';
import MyBoardActionsDropdown from './MyBoardActionsDropdown.js';
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

export const ravMovesBrowser = RavMovesFactory.create(localStorage.getItem('format'), {
  el: document.querySelector('#movesBrowser'),
  props() {
    return({
      chessboard: chessboard,
      filtered: '',
      breakdown: [
        ''
      ],
      fen: [
        FEN.start
      ]
    });
  }
});

export const ravPanel = new RavPanel({
  el: document.querySelector('#ravPanel'),
  props() {
    return({
      boardActionsDropdown: new MyBoardActionsDropdown({
        el: document.querySelector('#boardActionsDropdown ul'),
        props() {
          return({
            movesBrowser: ravMovesBrowser
          });
        }
      }),
      historyButtons: new HistoryButtons({
        el: document.querySelector('#historyButtons'),
        props() {
          return({
            movesBrowser: ravMovesBrowser
          });
        }
      }),
      movesMetadataTable: new MovesMetadataTable({
        el: document.querySelector('#movesMetadataTable tbody'),
        props() {
          return({});
        }
      }),
      movesBrowser: ravMovesBrowser
    });
  }
});
