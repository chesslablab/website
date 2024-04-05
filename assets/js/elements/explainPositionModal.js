import Modal from 'bootstrap/js/dist/modal.js';
import ExplainPositionModal from '../components/ExplainPositionModal.js';

const explainPositionModal = new ExplainPositionModal(
  document.getElementById('explainPositionModal'),
  {
    modal: new Modal(document.getElementById('explainPositionModal')),
    explanation: ''
  }
);

export default explainPositionModal;
