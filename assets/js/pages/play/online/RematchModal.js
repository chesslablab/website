import Modal from 'bootstrap/js/dist/modal.js';
import AbstractComponent from '../../../AbstractComponent.js';
import { playWebSocket } from '../../../PlayWebSocket.js';

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

export const rematchModal = new RematchModal(
  document.getElementById('rematchModal'),
  {
    modal: new Modal(document.getElementById('rematchModal')),
    form: document.querySelector('#rematchModal form')
  }
);
