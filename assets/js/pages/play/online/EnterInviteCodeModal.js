import jsCookie from 'https://cdn.jsdelivr.net/npm/js-cookie@3.0.5/+esm';
import { jwtDecode } from 'jwt-decode';
import Modal from 'bootstrap/js/dist/modal.js';
import AbstractComponent from '../../../AbstractComponent.js';
import { playWebSocket } from '../../../websockets/game/PlayWebSocket.js';

export class EnterInviteCodeModal extends AbstractComponent {
  mount() {
    this.props.form.addEventListener('submit', event => {
      event.preventDefault();
      const jwtDecoded = jsCookie.get('ui') ? jwtDecode(jsCookie.get('ui')) : null;
      const formData = new FormData(this.props.form);
      playWebSocket.send('/accept', {
        hash: formData.get('hash'),
        username: jwtDecoded ? jwtDecoded.username : null
      });
    });
  }
}

export const enterInviteCodeModal = new EnterInviteCodeModal(
  document.getElementById('enterInviteCodeModal'),
  {
    modal: new Modal(document.getElementById('enterInviteCodeModal')),
    form: document.querySelector('#enterInviteCodeModal form')
  }
);
