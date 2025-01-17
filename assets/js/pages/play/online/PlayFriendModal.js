import jsCookie from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import Modal from 'bootstrap/js/dist/modal.js';
import BaseComponent from '../../../BaseComponent.js';
import { playWebSocket } from '../../../websockets/game/PlayWebSocket.js';
import * as mode from '../../../../mode.js';
import * as variant from '../../../../variant.js';

export class PlayFriendModal extends BaseComponent {
  mount() {
    this.props.form.querySelector('select[name="variant"]').addEventListener('change', event => {
      event.target.value === variant.CHESS_960
        ? this.props.form.querySelector('.startPos').classList.remove('d-none')
        : this.props.form.querySelector('.startPos').classList.add('d-none');
    });

    this.props.form.addEventListener('submit', event => {
      event.preventDefault();
      const accessToken = jsCookie.get('access_token') ? jwtDecode(jsCookie.get('access_token')) : null;
      const formData = new FormData(this.props.form);
      playWebSocket.send('/start', {
        variant: formData.get('variant'),
        mode: mode.PLAY,
        settings: {
          min: formData.get('minutes'),
          increment: formData.get('increment'),
          color: formData.get('color'),
          submode: mode.SUBMODE_FRIEND,
          ...(formData.get('variant') === variant.CHESS_960) && {startPos: formData.get('startPos')},
          ...(formData.get('fen') && {fen: formData.get('fen')}),
          username: accessToken ? accessToken.username : null,
          elo: accessToken ? accessToken.elo : null
        }
      });
      this.props.modal.hide();
    });
  }
}

export const playFriendModal = new PlayFriendModal({
  el: document.querySelector('#playFriendModal'),
  props() {
    return({
      modal: new Modal(this.el),
      form: this.el.querySelector('form')
    });
  }
});
