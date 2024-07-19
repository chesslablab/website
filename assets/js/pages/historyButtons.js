import { HistoryButtons } from '@chesslablab/js-utils';
import sanMovesBrowser from './sanMovesBrowser.js';

const historyButtons = new HistoryButtons(
  document.querySelector('#historyButtons'),
  {
    movesBrowser: sanMovesBrowser
  }
);

export default historyButtons;
