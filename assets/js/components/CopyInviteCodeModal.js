import AbstractComponent from './AbstractComponent.js';
import infoModal from '../pages/infoModal.js';

class CopyInviteCodeModal extends AbstractComponent {
  mount() {
    this.props.form.addEventListener('submit', event => {
      event.preventDefault();
      const formData = new FormData(this.props.form);
      navigator.clipboard.writeText(formData.get('hash')).then(() => {
        this.props.modal.hide();
        infoModal.props.msg = 'Waiting for player to join...';
        infoModal.mount();
        infoModal.props.modal.show();
      }, function(err) {
        alert('Whoops! Failed to copy');
      });
    });
  }
}

export default CopyInviteCodeModal;
