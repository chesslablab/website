import { HistoryButtons } from '@chesslablab/jsblab';
import sanMovesTable from './sanMovesTable.js';

const historyButtons = new HistoryButtons(
  document.querySelector('#historyButtons'),
  {
    movesTable: sanMovesTable
  }
);

export default historyButtons;
