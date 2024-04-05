import Modal from 'bootstrap/js/dist/modal.js';
import DrawModal from '../components/DrawModal.js';

const drawModal = new DrawModal(
  document.getElementById('drawModal'),
  {
    modal: new Modal(document.getElementById('drawModal')),
    form: document.querySelector('#drawModal form')
  }
);

export default drawModal;
