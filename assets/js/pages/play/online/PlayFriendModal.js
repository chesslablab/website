import Modal from 'bootstrap/js/dist/modal.js';
import { copyInviteCodeModal } from './CopyInviteCodeModal.js';
import AbstractComponent from '../../../AbstractComponent.js';
import { playWebSocket } from '../../../PlayWebSocket.js';
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
      const formData = new FormData(this.props.form);
      const add = {
        min: formData.get('minutes'),
        increment: formData.get('increment'),
        color: formData.get('color'),
        submode: 'friend',
        ...(formData.get('variant') === variant.CHESS_960) && {startPos: formData.get('startPos')},
        ...(formData.get('variant') === variant.CAPABLANCA_FISCHER) && {startPos: formData.get('startPos')},
        ...(formData.get('fen') && {fen: formData.get('fen')})
      };
      sessionStorage.setItem('color', formData.get('color'));
      playWebSocket.send(`/start ${formData.get('variant')} ${mode.PLAY} "${JSON.stringify(add).replace(/"/g, '\\"')}"`);
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
