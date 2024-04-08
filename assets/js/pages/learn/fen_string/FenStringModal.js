import Modal from 'bootstrap/js/dist/modal.js';
import AbstractComponent from '../../../AbstractComponent.js';
import { fenWebSocket } from '../../../FenWebSocket.js';
import * as mode from '../../../../mode.js';

export class FenStringModal extends AbstractComponent {
  mount() {
    this.props.form.addEventListener('submit', event => {
      event.preventDefault();
      const add = {
        fen: event.target.elements[1].value
      };
      fenWebSocket.send(`/start ${event.target.elements[0].value} ${mode.FEN} "${JSON.stringify(add).replace(/"/g, '\\"')}"`);
      this.props.modal.hide();
    });
  }
}

export const fenStringModal = new FenStringModal(
  document.getElementById('fenStringModal'),
  {
    modal: new Modal(document.getElementById('fenStringModal')),
    form: document.querySelector('#fenStringModal form')
  }
);
