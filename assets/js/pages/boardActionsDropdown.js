import { BoardActionsDropdown } from '@chesslablab/jsblab';
import sanMovesBrowser from './sanMovesBrowser.js';

const boardActionsDropdown = new BoardActionsDropdown(
  document.querySelector('#boardActionsDropdown ul'),
  {
    moves: sanMovesBrowser
  }
);

export default boardActionsDropdown;
