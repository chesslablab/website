import { GameActionsDropdown } from '@chesslablab/jsblab';
import sanMovesTable from './sanMovesTable.js';

const gameActionsDropdown = new GameActionsDropdown(
  document.querySelector('#gameActionsDropdown ul'),
  {
    movesTable: sanMovesTable
  }
);

export default gameActionsDropdown;
