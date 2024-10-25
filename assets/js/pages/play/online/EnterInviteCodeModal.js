import jsCookie from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import Modal from 'bootstrap/js/dist/modal.js';
import BaseComponent from '../../../BaseComponent.js';
import { playWebSocket } from '../../../websockets/game/PlayWebSocket.js';

export class EnterInviteCodeModal extends BaseComponent {
  mount() {
    this.props.form.addEventListener('submit', event => {
      event.preventDefault();
      const accessToken = jsCookie.get('access_token') ? jwtDecode(jsCookie.get('access_token')) : null;
      const formData = new FormData(this.props.form);
      playWebSocket.send('/accept', {
        uid: formData.get('uid'),
        username: accessToken ? accessToken.username : null,
        elo: accessToken ? accessToken.elo : null
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
