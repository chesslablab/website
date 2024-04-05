import AbstractComponent from './AbstractComponent.js';
import onlinePlayersModal from '../pages/play/online/onlinePlayersModal.js';
import ws from '../playWs.js';
import * as mode from '../../mode.js';

class CreateGameModal extends AbstractComponent {
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
      ws.send(`/start ${formData.get('variant')} ${mode.PLAY} "${JSON.stringify(add).replace(/"/g, '\\"')}"`);
      onlinePlayersModal.props.modal.show();
    });
  }
}

export default CreateGameModal;
