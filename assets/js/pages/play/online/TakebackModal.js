import Modal from 'bootstrap/js/dist/modal.js';
import AbstractComponent from '../../../AbstractComponent.js';
import { playWebSocket } from '../../../websockets/game/PlayWebSocket.js';

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

export const takebackModal = new TakebackModal(
  document.getElementById('takebackModal'),
  {
    modal: new Modal(document.getElementById('takebackModal')),
    form: document.querySelector('#takebackModal form')
  }
);
