import Modal from 'bootstrap/js/dist/modal.js';
import HeuristicsModal from '../components/HeuristicsModal.js';

const heuristicsModal = new HeuristicsModal(
  document.getElementById('heuristicsModal'),
  {
    modal: new Modal(document.getElementById('heuristicsModal')),
    charts: document.getElementById('charts'),
    heuristics: []
  }
);

export default heuristicsModal;
