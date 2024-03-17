import Modal from 'bootstrap/js/dist/modal.js';
import { Opening } from '@chesslablab/jsblab';
import openingsTable from '../openingsTable.js';

const openingsSanMovetextModal = {
  modal: new Modal(document.getElementById('openingsSanMovetextModal')),
  form: document.querySelector('#openingsSanMovetextModal form')
}

openingsSanMovetextModal.form.addEventListener('submit', event => {
  event.preventDefault();
  const formData = new FormData(openingsSanMovetextModal.form);
  const openings = Opening.byMovetext(formData.get('movetext'));
  const tbody = openingsSanMovetextModal.form.getElementsByTagName('tbody')[0];
  openingsTable(openingsSanMovetextModal.modal, openings, tbody);
});

export default openingsSanMovetextModal;
