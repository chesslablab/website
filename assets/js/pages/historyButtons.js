import { HistoryButtons } from '@chesslablab/js-utils';
import sanMovesBrowser from './sanMovesBrowser.js';

const historyButtons = new HistoryButtons({
  el: document.querySelector('#historyButtons'),
  props() {
    return({
      movesBrowser: sanMovesBrowser
    });
  }
});

export default historyButtons;
