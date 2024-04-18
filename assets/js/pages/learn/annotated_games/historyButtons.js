import { HistoryButtons } from '@chesslablab/jsblab';
import ravMovesTable from './ravMovesTable.js';

const historyButtons = new HistoryButtons(
  document.querySelector('#historyButtons'),
  {
    moves: ravMovesTable
  }
);

export default historyButtons;
