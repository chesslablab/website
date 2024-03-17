import Modal from 'bootstrap/js/dist/modal.js';
import { Opening } from '@chesslablab/jsblab';
import openingsTable from '../openingsTable.js';

const openingsSanMovetext = {
  modal: new Modal(document.getElementById('openingsSanMovetextModal')),
  form: document.querySelector('#openingsSanMovetextModal form')
}

openingsSanMovetext.form.addEventListener('submit', event => {
  event.preventDefault();
  const formData = new FormData(openingsSanMovetext.form);
  const openings = Opening.byMovetext(formData.get('movetext'));
  const tbody = openingsSanMovetext.form.getElementsByTagName('tbody')[0];
  openingsTable(openingsSanMovetext.modal, openings, tbody);
});

export default openingsSanMovetext;
