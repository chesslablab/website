import { GameActionsDropdown } from '@chesslablab/jsblab';
import ravMovesTable from './ravMovesTable.js';

const gameActionsDropdown = new GameActionsDropdown(
  document.querySelector('#gameActionsDropdown ul'),
  {
    movesTable: ravMovesTable
  }
);

export default gameActionsDropdown;
