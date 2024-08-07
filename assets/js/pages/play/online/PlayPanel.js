import { finishedButtons } from './FinishedButtons.js';
import { timerTable, timerTableInterval } from './timerTable.js';
import boardActionsDropdown from '../../boardActionsDropdown.js';
import { gameActionsDropdown } from '../../GameActionsDropdown.js';
import historyButtons from '../../historyButtons.js';
import sanMovesBrowser from '../../sanMovesBrowser.js';
import AbstractComponent from '../../../AbstractComponent.js';
import { playWebSocket } from '../../../websockets/game/PlayWebSocket.js';
import * as action from '../../../../action.js';

export class PlayPanel extends AbstractComponent {
  mount() {
    this.props.gameActionsDropdown.props.ul.children.item(0).addEventListener('click', (event) => {
      event.preventDefault();
      sessionStorage.setItem('takeback', action.PROPOSE);
      playWebSocket.send('/takeback propose');
      playWebSocket.infoModal.props.msg = "Waiting for your opponent to accept or decline";
      playWebSocket.infoModal.mount();
      playWebSocket.infoModal.props.modal.show();
    });

    this.props.gameActionsDropdown.props.ul.children.item(1).addEventListener('click', (event) => {
      event.preventDefault();
      sessionStorage.setItem('draw', action.PROPOSE);
      playWebSocket.send('/draw propose');
      playWebSocket.infoModal.props.msg = "Waiting for your opponent to accept or decline";
      playWebSocket.infoModal.mount();
      playWebSocket.infoModal.props.modal.show();
    });

    this.props.gameActionsDropdown.props.ul.children.item(2).addEventListener('click', (event) => {
      event.preventDefault();
      playWebSocket.send('/resign accept');
    });

    this.props.finishedButtons.el.children.item(0).addEventListener('click', (event) => {
      event.preventDefault();
      sessionStorage.setItem('rematch', action.PROPOSE);
      playWebSocket.send('/rematch propose');
      playWebSocket.infoModal.props.msg = "Waiting for your opponent to accept or decline";
      playWebSocket.infoModal.mount();
      playWebSocket.infoModal.props.modal.show();
    });

    this.props.finishedButtons.el.children.item(1).addEventListener('click', (event) => {
      event.preventDefault();
      playWebSocket.chessboard.setPosition(FEN.start, true);
      playOnlineButtons.el.classList.remove('d-none');
      playWebSocket.el.classList.add('d-none');
    });
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
