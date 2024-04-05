import Modal from 'bootstrap/js/dist/modal.js';
import OpeningsSanMovetextModal from '../components/OpeningsSanMovetextModal.js';

const openingsSanMovetextModal = new OpeningsSanMovetextModal(
  document.getElementById('openingsSanMovetextModal'),
  {
    modal: new Modal(document.getElementById('openingsSanMovetextModal')),
    form: document.querySelector('#openingsSanMovetextModal form')
  }
);

export default openingsSanMovetextModal;
