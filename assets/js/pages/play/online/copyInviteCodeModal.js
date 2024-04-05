import Modal from 'bootstrap/js/dist/modal.js';
import CopyInviteCodeModal from '../../../components/CopyInviteCodeModal.js';
import infoModal from '../../../pages/infoModal.js';

const copyInviteCodeModal = new CopyInviteCodeModal(
  document.getElementById('copyInviteCodeModal'),
  {
    modal: new Modal(document.getElementById('copyInviteCodeModal')),
    form: document.querySelector('#copyInviteCodeModal form'),
    infoModal: infoModal
  }
);

export default copyInviteCodeModal;
