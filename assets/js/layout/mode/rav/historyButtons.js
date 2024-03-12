import { HistoryButtons } from '@chesslablab/jsblab';
import ravMovesTable from './ravMovesTable.js';

const historyButtons = new HistoryButtons(
  document.querySelector('#historyButtons'),
  {
    movesTable: ravMovesTable
  }
);

export default historyButtons;
