import { HistoryButtons } from '@chesslablab/jsblab';
import ravMovesBrowser from './ravMovesBrowser.js';

const historyButtons = new HistoryButtons(
  document.querySelector('#historyButtons'),
  {
    moves: ravMovesBrowser
  }
);

export default historyButtons;
