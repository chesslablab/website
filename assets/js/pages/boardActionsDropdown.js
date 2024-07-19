import { BoardActionsDropdown } from '@chesslablab/js-utils';
import sanMovesBrowser from './sanMovesBrowser.js';

const boardActionsDropdown = new BoardActionsDropdown(
  document.querySelector('#boardActionsDropdown ul'),
  {
    movesBrowser: sanMovesBrowser
  }
);

export default boardActionsDropdown;
