import Modal from 'bootstrap/js/dist/modal.js';
import { HistoryButtons } from '@chesslablab/js-utils';
import { TimerTable } from '@chesslablab/js-utils';
import { gameActionsDropdown } from '../../GameActionsDropdown.js';
import MyBoardActionsDropdown from '../../MyBoardActionsDropdown.js';
import sanMovesBrowser from '../../sanMovesBrowser.js';
import BaseComponent from '../../../BaseComponent.js';
import { playWebSocket } from '../../../websockets/game/PlayWebSocket.js';

const timerTable = new TimerTable({
  el: document.querySelector('#timerTable tbody'),
  props() {
    return({
      turn: 'w',
      seconds: {
        w: 300,
        b: 300
      },
      username: {
        w: 'Alice',
        b: 'Bob'
      }
    });
  }
});

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

export const playPanel = new PlayPanel({
  el: document.querySelector('#playPanel'),
  props() {
    return({
      boardActionsDropdown: new MyBoardActionsDropdown({
        el: document.querySelector('#boardActionsDropdown ul'),
        props() {
          return({
            movesBrowser: sanMovesBrowser
          });
        }
      }),
      gameActionsDropdown: gameActionsDropdown,
      takebackModal: new TakebackModal({
        el: document.querySelector('#takebackModal'),
        props() {
          return({
            modal: new Modal(this.el),
            form: this.el.querySelector('form')
          });
        }
      }),
      drawModal: new DrawModal({
        el: document.querySelector('#drawModal'),
        props() {
          return({
            modal: new Modal(this.el),
            form: this.el.querySelector('form')
          });
        }
      }),
      rematchModal: new RematchModal({
        el: document.querySelector('#rematchModal'),
        props() {
          return({
            modal: new Modal(this.el),
            form: this.el.querySelector('form')
          });
        }
      }),
      historyButtons: new HistoryButtons({
        el: document.querySelector('#historyButtons'),
        props() {
          return({
            movesBrowser: sanMovesBrowser
          });
        }
      }),
      movesBrowser: sanMovesBrowser,
      finishedButtons: new BaseComponent({
        el: document.querySelector('#finishedButtons')
      }),
      timerTable: timerTable,
      timerTableInterval: timerTableInterval
    });
  }
});
