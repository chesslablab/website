import { BoardActionsDropdown } from '@chesslablab/jsblab';
import sanMovesTable from './sanMovesTable.js';

const boardActionsDropdown = new BoardActionsDropdown(
  document.querySelector('#boardActionsDropdown ul'),
  {
    movesTable: sanMovesTable
  }
);

export default boardActionsDropdown;
