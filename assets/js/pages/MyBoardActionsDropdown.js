import { BoardActionsDropdown } from '@chesslablab/js-utils';
import { binaryWebSocket } from '../websockets/binary/BinaryWebSocket.js';

export default class MyBoardActionsDropdown extends BoardActionsDropdown {
  mount() {
    super.mount();

    this.el.children.item(3).addEventListener('click', (event) => {
      event.preventDefault();
      binaryWebSocket.send('/image', {
        fen: this.props.movesBrowser.props.fen[this.props.movesBrowser.current],
        flip: this.props.movesBrowser.props.chessboard.getOrientation()
      });
    });
  }
}
