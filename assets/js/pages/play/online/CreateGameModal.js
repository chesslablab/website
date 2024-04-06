import Modal from 'bootstrap/js/dist/modal.js';
import { onlinePlayersModal } from './OnlinePlayersModal.js';
import AbstractComponent from '../../../AbstractComponent.js';
import { playWebSocket } from '../../../PlayWebSocket.js';
import * as mode from '../../../../mode.js';

export class CreateGameModal extends AbstractComponent {
  mount() {
    this.props.form.addEventListener('submit', event => {
      event.preventDefault();
      const formData = new FormData(this.props.form);
      const add = {
        min: formData.get('minutes'),
        increment: formData.get('increment'),
        color: formData.get('color'),
        submode: 'online'
      };
      localStorage.setItem('color', formData.get('color'));
      playWebSocket.send(`/start ${formData.get('variant')} ${mode.PLAY} "${JSON.stringify(add).replace(/"/g, '\\"')}"`);
      this.props.onlinePlayersModal.props.modal.show();
    });
  }
}

export const createGameModal = new CreateGameModal(
  document.getElementById('createGameModal'),
  {
    modal: new Modal(document.getElementById('createGameModal')),
    form: document.querySelector('#createGameModal form'),
    onlinePlayersModal: onlinePlayersModal
  }
);
