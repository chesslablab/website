import { BoardActionsDropdown } from '@chesslablab/jsblab';
import ravMovesBrowser from '../../ravMovesBrowser.js';

const boardActionsDropdown = new BoardActionsDropdown(
  document.querySelector('#boardActionsDropdown ul'),
  {
    moves: ravMovesBrowser
  }
);

export default boardActionsDropdown;
