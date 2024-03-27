import { BoardActionsDropdown } from '@chesslablab/jsblab';
import ravMovesTable from './ravMovesTable.js';

const boardActionsDropdown = new BoardActionsDropdown(
  document.querySelector('#boardActionsDropdown ul'),
  {
    movesTable: ravMovesTable
  }
);

export default boardActionsDropdown;
