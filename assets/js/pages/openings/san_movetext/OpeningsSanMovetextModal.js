import Modal from 'bootstrap/js/dist/modal.js';
import { Opening } from '@chesslablab/js-utils';
import OpeningsTable from '../OpeningsTable.js';
import AbstractComponent from '../../../AbstractComponent.js';

export class OpeningsSanMovetextModal extends AbstractComponent {
  mount() {
    this.props.form.addEventListener('submit', event => {
      event.preventDefault();
      const formData = new FormData(this.props.form);
      const openingsTable = new OpeningsTable(
        this.props.form.querySelector('table'),
        {
          modal: this.props.modal,
          openings: Opening.byMovetext(formData.get('movetext'))
        }
      );
      openingsTable.mount();
    });
  }
}

export const openingsSanMovetextModal = new OpeningsSanMovetextModal(
  document.getElementById('openingsSanMovetextModal'),
  {
    modal: new Modal(document.getElementById('openingsSanMovetextModal')),
    form: document.querySelector('#openingsSanMovetextModal form')
  }
);
