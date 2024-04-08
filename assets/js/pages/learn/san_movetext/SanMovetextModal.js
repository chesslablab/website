import Modal from 'bootstrap/js/dist/modal.js';
import AbstractComponent from '../../../AbstractComponent.js';
import { sanWebSocket } from '../../../SanWebSocket.js';
import * as mode from '../../../../mode.js';

export class SanMovetextModal extends AbstractComponent {
  mount() {
    this.props.form.addEventListener('submit', event => {
      event.preventDefault();
      const add = {
        ...(event.target.elements[1].value && {fen: event.target.elements[1].value}),
        movetext: event.target.elements[2].value
      };
      sanWebSocket.send(`/start ${event.target.elements[0].value} ${mode.SAN} "${JSON.stringify(add).replace(/"/g, '\\"')}"`);
      this.props.modal.hide();
    });
  }
}

export const sanMovetextModal = new SanMovetextModal(
  document.getElementById('fenStringModal'),
  {
    modal: new Modal(document.getElementById('sanMovetextModal')),
    form: document.querySelector('#sanMovetextModal form')
  }
);
