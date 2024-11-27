import Modal from 'bootstrap/js/dist/modal.js';
import { TimerTable } from '@chesslablab/js-utils';
import { playOnlineButtons } from './PlayOnlineButtons.js';
import { gameActionsDropdown } from '../../GameActionsDropdown.js';
import historyButtons from '../../historyButtons.js';
import MyBoardActionsDropdown from '../../MyBoardActionsDropdown.js';
import sanMovesBrowser from '../../sanMovesBrowser.js';
import BaseComponent from '../../../BaseComponent.js';
import { playWebSocket } from '../../../websockets/game/PlayWebSocket.js';

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

export class TakebackModal extends BaseComponent {
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

export class DrawModal extends BaseComponent {
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

export class RematchModal extends BaseComponent {
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

export class PlayPanel extends BaseComponent {
  mount() {
    this.props.gameActionsDropdown.props.ul.children.item(0).addEventListener('click', (event) => {
      event.preventDefault();
      playWebSocket.send('/takeback propose');
      playWebSocket.infoModal.props.msg = "Waiting for your opponent to accept or decline";
      playWebSocket.infoModal.mount();
      playWebSocket.infoModal.props.modal.show();
    });

    this.props.gameActionsDropdown.props.ul.children.item(1).addEventListener('click', (event) => {
      event.preventDefault();
      playWebSocket.send('/draw propose');
      playWebSocket.infoModal.props.msg = "Waiting for your opponent to accept or decline";
      playWebSocket.infoModal.mount();
      playWebSocket.infoModal.props.modal.show();
    });

    this.props.gameActionsDropdown.props.ul.children.item(2).addEventListener('click', (event) => {
      event.preventDefault();
      playWebSocket.send('/resign', {
        color: playWebSocket.color()
      });
    });

    this.props.finishedButtons.el.children.item(0).addEventListener('click', (event) => {
      event.preventDefault();
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
  document.querySelector('#playPanel'),
  {
    boardActionsDropdown: new MyBoardActionsDropdown(
      document.querySelector('#boardActionsDropdown ul'),
      {
        movesBrowser: sanMovesBrowser
      }
    ),
    gameActionsDropdown: gameActionsDropdown,
    takebackModal: new TakebackModal(
      document.querySelector('#takebackModal'),
      {
        modal: new Modal(document.querySelector('#takebackModal')),
        form: document.querySelector('#takebackModal form')
      }
    ),
    drawModal: new DrawModal(
      document.querySelector('#drawModal'),
      {
        modal: new Modal(document.querySelector('#drawModal')),
        form: document.querySelector('#drawModal form')
      }
    ),
    rematchModal: new RematchModal(
      document.querySelector('#rematchModal'),
      {
        modal: new Modal(document.querySelector('#rematchModal')),
        form: document.querySelector('#rematchModal form')
      }
    ),
    historyButtons: historyButtons,
    movesBrowser: sanMovesBrowser,
    finishedButtons: new BaseComponent(document.querySelector('#finishedButtons')),
    timerTable: timerTable,
    timerTableInterval: timerTableInterval
  }
);
