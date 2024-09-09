import jsCookie from 'https://cdn.jsdelivr.net/npm/js-cookie@3.0.5/+esm';
import { jwtDecode } from 'jwt-decode';
import Modal from 'bootstrap/js/dist/modal.js';
import { copyInviteCodeModal } from './CopyInviteCodeModal.js';
import AbstractComponent from '../../../AbstractComponent.js';
import { playWebSocket } from '../../../websockets/game/PlayWebSocket.js';
import * as mode from '../../../../mode.js';
import * as variant from '../../../../variant.js';

export class PlayFriendModal extends AbstractComponent {
  mount() {
    this.props.form.getElementsByTagName('select')[0].addEventListener('change', event => {
      event.preventDefault();
      if (event.target.value === variant.CHESS_960) {
        this.props.form.getElementsByClassName('startPos')[0].classList.remove('d-none');
      } else {
        this.props.form.getElementsByClassName('startPos')[0].classList.add('d-none');
      }
    });

    this.props.form.addEventListener('submit', event => {
      event.preventDefault();
      const jwtDecoded = jsCookie.get('ui') ? jwtDecode(jsCookie.get('ui')) : null;
      const formData = new FormData(this.props.form);
      sessionStorage.setItem('color', formData.get('color'));
      playWebSocket.send('/start', {
        variant: formData.get('variant'),
        mode: mode.PLAY,
        settings: {
          min: formData.get('minutes'),
          increment: formData.get('increment'),
          color: formData.get('color'),
          submode: 'friend',
          ...(formData.get('variant') === variant.CHESS_960) && {startPos: formData.get('startPos')},
          ...(formData.get('fen') && {fen: formData.get('fen')}),
          username: jwtDecoded ? jwtDecoded.username : null
        }
      });
      this.props.modal.hide();
      this.props.copyInviteCodeModal.props.modal.show();
    });
  }
}

export const playFriendModal = new PlayFriendModal(
  document.getElementById('playFriendModal'),
  {
    modal: new Modal(document.getElementById('playFriendModal')),
    form: document.querySelector('#playFriendModal form'),
    copyInviteCodeModal: copyInviteCodeModal
  }
);
