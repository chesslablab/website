import Modal from 'bootstrap/js/dist/modal.js';
import OpeningsEcoCodeModal from '../components/OpeningsEcoCodeModal.js';

const openingsEcoCodeModal = new OpeningsEcoCodeModal(
  document.getElementById('openingsEcoCodeModal'),
  {
    modal: new Modal(document.getElementById('openingsEcoCodeModal')),
    form: document.querySelector('#openingsEcoCodeModal form')
  }
);

export default openingsEcoCodeModal;
