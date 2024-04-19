import { HistoryButtons } from '@chesslablab/jsblab';
import ravMovesBrowser from '../../ravMovesBrowser.js';

const historyButtons = new HistoryButtons(
  document.querySelector('#historyButtons'),
  {
    movesBrowser: ravMovesBrowser
  }
);

export default historyButtons;
