import { BoardActionsDropdown } from '@chesslablab/js-utils';
import sanMovesBrowser from './sanMovesBrowser.js';
import { binaryWebSocket } from '../websockets/binary/BinaryWebSocket.js';

const boardActionsDropdown = new BoardActionsDropdown(
  document.querySelector('#boardActionsDropdown ul'),
  {
    movesBrowser: sanMovesBrowser
  }
);

boardActionsDropdown.el.children.item(3).addEventListener('click', (event) => {
  event.preventDefault();
  const settings = {
    fen: boardActionsDropdown.props.movesBrowser.props.fen[boardActionsDropdown.props.movesBrowser.current],
    flip: boardActionsDropdown.props.movesBrowser.props.chessboard.getOrientation()
  };
  binaryWebSocket.send(`/image "${JSON.stringify(settings).replace(/"/g, '\\"')}"`);
});

export default boardActionsDropdown;
