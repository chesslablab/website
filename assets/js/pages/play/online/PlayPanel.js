import Modal from 'bootstrap/js/dist/modal.js';
import { timerTable, timerTableInterval } from './timerTable.js';
import boardActionsDropdown from '../../boardActionsDropdown.js';
import { gameActionsDropdown } from '../../GameActionsDropdown.js';
import historyButtons from '../../historyButtons.js';
import sanMovesBrowser from '../../sanMovesBrowser.js';
import AbstractComponent from '../../../AbstractComponent.js';
import { binaryWebSocket } from '../../../websockets/binary/BinaryWebSocket.js';
import { playWebSocket } from '../../../websockets/game/PlayWebSocket.js';
import * as action from '../../../../action.js';

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

export class PlayPanel extends AbstractComponent {
  mount() {
    this.props.boardActionsDropdown.el.children.item(3).addEventListener('click', (event) => {
      event.preventDefault();
      const settings = {
        fen: this.props.sanMovesBrowser.props.fen[this.props.sanMovesBrowser.current],
        flip: this.props.sanMovesBrowser.props.chessboard.getOrientation()
      };
      binaryWebSocket.send(`/image "${JSON.stringify(settings).replace(/"/g, '\\"')}"`);
    });

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
    historyButtons: historyButtons,
    sanMovesBrowser: sanMovesBrowser,
    finishedButtons: new FinishedButtons(document.getElementById('finishedButtons')),
    timerTable: timerTable,
    timerTableInterval: timerTableInterval
  }
);
