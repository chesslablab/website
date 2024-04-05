import Modal from 'bootstrap/js/dist/modal.js';
import RematchModal from '../components/RematchModal.js';

const rematchModal = new RematchModal(
  document.getElementById('rematchModal'),
  {
    modal: new Modal(document.getElementById('rematchModal')),
    form: document.querySelector('#rematchModal form')
  }
);

export default rematchModal;
