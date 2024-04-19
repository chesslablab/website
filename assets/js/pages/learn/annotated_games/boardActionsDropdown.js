import { BoardActionsDropdown } from '@chesslablab/jsblab';
import ravMovesBrowser from '../../ravMovesBrowser.js';

const boardActionsDropdown = new BoardActionsDropdown(
  document.querySelector('#boardActionsDropdown ul'),
  {
    movesBrowser: ravMovesBrowser
  }
);

export default boardActionsDropdown;
