import Modal from 'bootstrap/js/dist/modal.js';
import ProgressModal from '../components/ProgressModal.js';

const progressModal = new ProgressModal(
  document.getElementById('progressModal'),
  {
    modal: new Modal(document.getElementById('progressModal'))
  }
);

export default progressModal;
