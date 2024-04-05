import AbstractComponent from './AbstractComponent.js';
import ws from '../playWs.js';

class EnterInviteCodeModal extends AbstractComponent {
  mount() {
    this.props.form.addEventListener('submit', event => {
      event.preventDefault();
      const formData = new FormData(this.props.form);
      ws.send(`/accept ${formData.get('hash')}`);
    });
  }
}

export default EnterInviteCodeModal;
