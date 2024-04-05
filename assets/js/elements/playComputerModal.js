import Modal from 'bootstrap/js/dist/modal.js';
import PlayComputerModal from '../components/PlayComputerModal.js';

const playComputerModal = new PlayComputerModal(
  document.getElementById('playComputerModal'),
  {
    modal: new Modal(document.getElementById('playComputerModal')),
    form: document.querySelector('#playComputerModal form')
  }
);

export default playComputerModal;
