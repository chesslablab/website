import Modal from 'bootstrap/js/dist/modal.js';
import { infoModal } from '../../InfoModal.js';
import AbstractComponent from '../../../AbstractComponent.js';

export class CopyInviteCodeModal extends AbstractComponent {
  mount() {
    this.props.form.addEventListener('submit', event => {
      event.preventDefault();
      const formData = new FormData(this.props.form);
      navigator.clipboard.writeText(formData.get('hash')).then(() => {
        this.props.modal.hide();
        this.props.infoModal.props.msg = 'Waiting for player to join...';
        this.props.infoModal.mount();
        this.props.infoModal.props.modal.show();
      }, function(err) {
        alert('Whoops! Failed to copy');
      });
    });
  }
}

export const copyInviteCodeModal = new CopyInviteCodeModal(
  document.getElementById('copyInviteCodeModal'),
  {
    modal: new Modal(document.getElementById('copyInviteCodeModal')),
    form: document.querySelector('#copyInviteCodeModal form'),
    infoModal: infoModal
  }
);
