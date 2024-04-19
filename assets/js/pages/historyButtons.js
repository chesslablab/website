import { HistoryButtons } from '@chesslablab/jsblab';
import sanMovesBrowser from './sanMovesBrowser.js';

const historyButtons = new HistoryButtons(
  document.querySelector('#historyButtons'),
  {
    movesBrowser: sanMovesBrowser
  }
);

export default historyButtons;
