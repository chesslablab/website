import jsCookie from 'https://cdn.jsdelivr.net/npm/js-cookie@3.0.5/+esm';
import Modal from 'bootstrap/js/dist/modal.js';
import AbstractComponent from '../../../AbstractComponent.js';
import { playWebSocket } from '../../../websockets/game/PlayWebSocket.js';
import * as mode from '../../../../mode.js';

export class CreateGameModal extends AbstractComponent {
  mount() {
    this.props.form.addEventListener('submit', event => {
      event.preventDefault();
      const formData = new FormData(this.props.form);
      const settings = {
        min: formData.get('minutes'),
        increment: formData.get('increment'),
        color: formData.get('color'),
        submode: 'online',
        username: jsCookie.get('ui') ? JSON.parse(jsCookie.get('ui')).username : null
      };
      sessionStorage.setItem('color', formData.get('color'));
      playWebSocket.send(`/start ${formData.get('variant')} ${mode.PLAY} "${JSON.stringify(settings).replace(/"/g, '\\"')}"`);
    });
  }
}

export const createGameModal = new CreateGameModal(
  document.getElementById('createGameModal'),
  {
    modal: new Modal(document.getElementById('createGameModal')),
    form: document.querySelector('#createGameModal form')
  }
);
