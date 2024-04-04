import Modal from 'bootstrap/js/dist/modal.js';
import { Opening } from '@chesslablab/jsblab';
import OpeningsTable from '../../../components/OpeningsTable.js';

const openingsEcoCodeModal = {
  modal: new Modal(document.getElementById('openingsEcoCodeModal')),
  form: document.querySelector('#openingsEcoCodeModal form')
}

openingsEcoCodeModal.form.getElementsByTagName('select')[0].addEventListener('change', event => {
  event.preventDefault();
  const openingsTable = new OpeningsTable(
    openingsEcoCodeModal.form.querySelector('table'),
    {
      modal: openingsEcoCodeModal.modal,
      openings: Opening.byEco(event.target.value)
    }
  );
  openingsTable.mount();
});

export default openingsEcoCodeModal;
