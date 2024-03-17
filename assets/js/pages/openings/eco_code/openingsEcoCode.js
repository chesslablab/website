import Modal from 'bootstrap/js/dist/modal.js';
import { Opening } from '@chesslablab/jsblab';
import openingsTable from '../openingsTable.js';

const openingsEcoCode = {
  modal: new Modal(document.getElementById('openingsEcoCodeModal')),
  form: document.querySelector('#openingsEcoCodeModal form')
}

openingsEcoCode.form.getElementsByTagName('select')[0].addEventListener('change', event => {
  event.preventDefault();
  const openings = Opening.byEco(event.target.value);
  const tbody = openingsEcoCode.form.getElementsByTagName('tbody')[0];
  openingsTable(openingsEcoCode.modal, openings, tbody);
});

export default openingsEcoCode;
