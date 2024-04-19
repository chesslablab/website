import { BoardActionsDropdown } from '@chesslablab/jsblab';
import sanMovesBrowser from './sanMovesBrowser.js';

const boardActionsDropdown = new BoardActionsDropdown(
  document.querySelector('#boardActionsDropdown ul'),
  {
    movesBrowser: sanMovesBrowser
  }
);

export default boardActionsDropdown;
