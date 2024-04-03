import Modal from 'bootstrap/js/dist/modal.js';
import InfoModal from './InfoModal.js';

const infoModal = new InfoModal(
  document.getElementById('infoModal'),
  {
    modal: new Modal(document.getElementById('infoModal')),
    msg: ''
  }
);

export default infoModal;
