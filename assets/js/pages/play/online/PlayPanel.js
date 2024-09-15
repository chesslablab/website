import { jwtDecode } from 'jwt-decode';
import Modal from 'bootstrap/js/dist/modal.js';
import { FEN } from '@chesslablab/chessboard';
import { TimerTable } from '@chesslablab/js-utils';
import { playOnlineButtons } from './PlayOnlineButtons.js';
import { gameActionsDropdown } from '../../GameActionsDropdown.js';
import historyButtons from '../../historyButtons.js';
import MyBoardActionsDropdown from '../../MyBoardActionsDropdown.js';
import sanMovesBrowser from '../../sanMovesBrowser.js';
import AbstractComponent from '../../../AbstractComponent.js';
import { binaryWebSocket } from '../../../websockets/binary/BinaryWebSocket.js';
import { playWebSocket } from '../../../websockets/game/PlayWebSocket.js';
import * as action from '../../../../action.js';

export const timerTable = new TimerTable(
  document.querySelector('#timerTable tbody'),
  {
    turn: 'w',
    seconds: {
      w: 0,
      b: 0
    },
    username: {
      w: '',
      b: ''
    }
  }
);

export const timerTableInterval = () => {
  return setInterval(() => {
    timerTable.count().mount();
  }, 1000);
}

export class TakebackModal extends AbstractComponent {
  mount() {
    this.props.form.children.item(0).addEventListener('click', async (event) => {
      event.preventDefault();
      playWebSocket.send('/takeback accept');
      playWebSocket.send('/undo');
    });

    this.props.form.children.item(1).addEventListener('click', async (event) => {
      event.preventDefault();
      playWebSocket.send('/takeback decline');
    });
  }
}

export class DrawModal extends AbstractComponent {
  mount() {
    this.props.form.children.item(0).addEventListener('click', async (event) => {
      event.preventDefault();
      playWebSocket.send('/draw accept');
    });

    this.props.form.children.item(1).addEventListener('click', async (event) => {
      event.preventDefault();
      playWebSocket.send('/draw decline');
    });
  }
}

export class FinishedButtons extends AbstractComponent {
  mount() {
    // ...
  }
}

export class RematchModal extends AbstractComponent {
  mount() {
    this.props.form.addEventListener('submit', event => {
      event.preventDefault();
      playWebSocket.send('/rematch accept');
    });

    this.props.form.children.item(1).addEventListener('click', async (event) => {
      event.preventDefault();
      playWebSocket.send('/rematch decline');
    });
  }
}

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
      playWebSocket.send('/resign', {
        color: playWebSocket.color(jwtDecode(sessionStorage.getItem('accept_token')))
      });
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
      location.reload();
    });
  }
}

export const playPanel = new PlayPanel(
  document.getElementById('playPanel'),
  {
    boardActionsDropdown: new MyBoardActionsDropdown(
      document.querySelector('#boardActionsDropdown ul'),
      {
        movesBrowser: sanMovesBrowser
      }
    ),
    gameActionsDropdown: gameActionsDropdown,
    takebackModal: new TakebackModal(
      document.getElementById('takebackModal'),
      {
        modal: new Modal(document.getElementById('takebackModal')),
        form: document.querySelector('#takebackModal form')
      }
    ),
    drawModal: new DrawModal(
      document.getElementById('drawModal'),
      {
        modal: new Modal(document.getElementById('drawModal')),
        form: document.querySelector('#drawModal form')
      }
    ),
    rematchModal: new RematchModal(
      document.getElementById('rematchModal'),
      {
        modal: new Modal(document.getElementById('rematchModal')),
        form: document.querySelector('#rematchModal form')
      }
    ),
    historyButtons: historyButtons,
    movesBrowser: sanMovesBrowser,
    finishedButtons: new FinishedButtons(document.getElementById('finishedButtons')),
    timerTable: timerTable,
    timerTableInterval: timerTableInterval
  }
);
