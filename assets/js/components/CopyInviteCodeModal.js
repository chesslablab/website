import AbstractComponent from './AbstractComponent.js';

class CopyInviteCodeModal extends AbstractComponent {
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

export default CopyInviteCodeModal;
