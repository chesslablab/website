import Modal from 'bootstrap/js/dist/modal.js';
import OpeningsNameModal from '../components/OpeningsNameModal.js';

const openingsNameModal = new OpeningsNameModal(
  document.getElementById('openingsNameModal'),
  {
    modal: new Modal(document.getElementById('openingsNameModal')),
    form: document.querySelector('#openingsNameModal form')
  }
);

export default openingsNameModal;
