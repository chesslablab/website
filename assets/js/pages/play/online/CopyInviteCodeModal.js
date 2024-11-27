import Modal from 'bootstrap/js/dist/modal.js';
import BaseComponent from '../../../BaseComponent.js';
import { trans } from '../../../i18n.js';

export class CopyInviteCodeModal extends BaseComponent {
  mount() {
    this.props.form.addEventListener('submit', event => {
      event.preventDefault();
      const formData = new FormData(this.props.form);
      navigator.clipboard.writeText(formData.get('uid')).then(() => {
        this.props.modal.hide();
        this.infoModal.props.msg = 'Waiting for player to join';
        this.infoModal.mount();
        this.infoModal.props.modal.show();
      }, function(err) {
        this.props.modal.hide();
        this.infoModal.props.msg = 'Whoops! Failed to copy.';
        this.infoModal.mount();
        this.infoModal.props.modal.show();
      });
    });
  }
}

export const copyInviteCodeModal = new CopyInviteCodeModal({
  el: document.querySelector('#copyInviteCodeModal'),
  props() {
    return({
      modal: new Modal(this.el),
      form: this.el.querySelector('form')
    });
  }
});
