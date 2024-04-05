import Modal from 'bootstrap/js/dist/modal.js';
import EnterInviteCodeModal from '../../../components/EnterInviteCodeModal.js';

const enterInviteCodeModal = new EnterInviteCodeModal(
  document.getElementById('enterInviteCodeModal'),
  {
    modal: new Modal(document.getElementById('enterInviteCodeModal')),
    form: document.querySelector('#enterInviteCodeModal form')
  }
);

export default enterInviteCodeModal;
