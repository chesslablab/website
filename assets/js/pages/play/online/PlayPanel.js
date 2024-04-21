import { finishedButtons } from './FinishedButtons.js';
import { timerTable, timerTableInterval } from './timerTable.js';
import boardActionsDropdown from '../../boardActionsDropdown.js';
import { gameActionsDropdown } from '../../GameActionsDropdown.js';
import historyButtons from '../../historyButtons.js';
import sanMovesBrowser from '../../sanMovesBrowser.js';
import AbstractComponent from '../../../AbstractComponent.js';

export class PlayPanel extends AbstractComponent {
  mount() {
    // do nothing
  }
}

export const playPanel = new PlayPanel(
  document.getElementById('playPanel'),
  {
    boardActionsDropdown: boardActionsDropdown,
    gameActionsDropdown: gameActionsDropdown,
    historyButtons: historyButtons,
    sanMovesBrowser: sanMovesBrowser,
    finishedButtons: finishedButtons,
    timerTable: timerTable,
    timerTableInterval: timerTableInterval
  }
);
