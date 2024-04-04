import Modal from 'bootstrap/js/dist/modal.js';
import TakebackModal from '../../../components/TakebackModal.js';

const takebackModal = new TakebackModal(
  document.getElementById('takebackModal'),
  {
    modal: new Modal(document.getElementById('takebackModal')),
    form: document.querySelector('#takebackModal form')
  }
);

export default takebackModal;
