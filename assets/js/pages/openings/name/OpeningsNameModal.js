import Modal from 'bootstrap/js/dist/modal.js';
import { Opening } from '@chesslablab/js-utils';
import OpeningsTable from '../OpeningsTable.js';
import AbstractComponent from '../../../AbstractComponent.js';

export class OpeningsNameModal extends AbstractComponent {
  mount() {
    this.props.form.addEventListener('submit', event => {
      event.preventDefault();
      const formData = new FormData(this.props.form);
      const openingsTable = new OpeningsTable(
        this.props.form.querySelector('table'),
        {
          modal: this.props.modal,
          openings: Opening.byName(formData.get('name'))
        }
      );
      openingsTable.mount();
    });
  }
}

export const openingsNameModal = new OpeningsNameModal(
  document.getElementById('openingsNameModal'),
  {
    modal: new Modal(document.getElementById('openingsNameModal')),
    form: document.querySelector('#openingsNameModal form')
  }
);
