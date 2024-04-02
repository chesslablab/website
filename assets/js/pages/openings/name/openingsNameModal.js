import Modal from 'bootstrap/js/dist/modal.js';
import { Opening } from '@chesslablab/jsblab';
import openingsTable from '../openingsTable.js';

const openingsNameModal = {
  modal: new Modal(document.getElementById('openingsNameModal')),
  form: document.querySelector('#openingsNameModal form')
}

openingsNameModal.form.addEventListener('submit', event => {
  event.preventDefault();
  const formData = new FormData(openingsNameModal.form);
  const openings = Opening.byName(formData.get('name'));
  const tbody = openingsNameModal.form.getElementsByTagName('tbody')[0];
  tbody.parentNode.classList.add('mt-3');
  openingsTable(openingsNameModal.modal, openings, tbody);
});

export default openingsNameModal;
