import Modal from 'bootstrap/js/dist/modal.js';
import infoModal from '../../../pages/infoModal.js';

const copyInviteCodeModal = {
  modal: new Modal(document.getElementById('copyInviteCodeModal')),
  form: document.querySelector('#copyInviteCodeModal form')
}

copyInviteCodeModal.form.addEventListener('submit', event => {
  event.preventDefault();
  const formData = new FormData(copyInviteCodeModal.form);
  navigator.clipboard.writeText(formData.get('hash')).then(() => {
    copyInviteCodeModal.modal.hide();
    infoModal.props.msg = 'Waiting for player to join...';
    infoModal.mount();
    infoModal.props.modal.show();
  }, function(err) {
    alert('Whoops! Failed to copy');
  });
});

export default copyInviteCodeModal;
