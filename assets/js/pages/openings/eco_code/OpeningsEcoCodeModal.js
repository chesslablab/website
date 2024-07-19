import Modal from 'bootstrap/js/dist/modal.js';
import { Opening } from '@chesslablab/js-utils';
import OpeningsTable from '../OpeningsTable.js';
import AbstractComponent from '../../../AbstractComponent.js';

export class OpeningsEcoCodeModal extends AbstractComponent {
  mount() {
    this.props.form.getElementsByTagName('select')[0].addEventListener('change', event => {
      event.preventDefault();
      const openingsTable = new OpeningsTable(
        this.props.form.querySelector('table'),
        {
          modal: this.props.modal,
          openings: Opening.byEco(event.target.value)
        }
      );
      openingsTable.mount();
    });
  }
}

export const openingsEcoCodeModal = new OpeningsEcoCodeModal(
  document.getElementById('openingsEcoCodeModal'),
  {
    modal: new Modal(document.getElementById('openingsEcoCodeModal')),
    form: document.querySelector('#openingsEcoCodeModal form')
  }
);
