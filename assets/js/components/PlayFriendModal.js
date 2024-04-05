import AbstractComponent from './AbstractComponent.js';
import ws from '../playWs.js';
import * as mode from '../../mode.js';
import * as variant from '../../variant.js';

class PlayFriendModal extends AbstractComponent {
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
      localStorage.setItem('color', formData.get('color'));
      ws.send(`/start ${formData.get('variant')} ${mode.PLAY} "${JSON.stringify(add).replace(/"/g, '\\"')}"`);
      this.props.modal.hide();
      this.props.copyInviteCodeModal.props.modal.show();
    });
  }
}

export default PlayFriendModal;
