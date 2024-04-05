import Modal from 'bootstrap/js/dist/modal.js';
import AbstractComponent from '../../../AbstractComponent.js';
import ws from '../../../playWs.js';

export class EnterInviteCodeModal extends AbstractComponent {
  mount() {
    this.props.form.addEventListener('submit', event => {
      event.preventDefault();
      const formData = new FormData(this.props.form);
      ws.send(`/accept ${formData.get('hash')}`);
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
