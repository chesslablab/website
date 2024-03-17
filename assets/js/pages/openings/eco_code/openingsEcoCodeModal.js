import Modal from 'bootstrap/js/dist/modal.js';
import { Opening } from '@chesslablab/jsblab';
import openingsTable from '../openingsTable.js';

const openingsEcoCodeModal = {
  modal: new Modal(document.getElementById('openingsEcoCodeModal')),
  form: document.querySelector('#openingsEcoCodeModal form')
}

openingsEcoCodeModal.form.getElementsByTagName('select')[0].addEventListener('change', event => {
  event.preventDefault();
  const openings = Opening.byEco(event.target.value);
  const tbody = openingsEcoCodeModal.form.getElementsByTagName('tbody')[0];
  openingsTable(openingsEcoCodeModal.modal, openings, tbody);
});

export default openingsEcoCodeModal;
