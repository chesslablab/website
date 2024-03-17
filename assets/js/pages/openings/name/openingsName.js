import Modal from 'bootstrap/js/dist/modal.js';
import { Opening } from '@chesslablab/jsblab';
import openingsTable from '../openingsTable.js';

const openingsName = {
  modal: new Modal(document.getElementById('openingsNameModal')),
  form: document.querySelector('#openingsNameModal form')
}

openingsName.form.addEventListener('submit', event => {
  event.preventDefault();
  const formData = new FormData(openingsName.form);
  const openings = Opening.byName(formData.get('name'));
  const tbody = openingsName.form.getElementsByTagName('tbody')[0];
  openingsTable(openingsName.modal, openings, tbody);
});

export default openingsName;
