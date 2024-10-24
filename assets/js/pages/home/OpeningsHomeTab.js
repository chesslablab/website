import { Opening } from '@chesslablab/js-utils';
import OpeningsTable from './OpeningsTable.js';
import AbstractComponent from '../../AbstractComponent.js';

export class OpeningsHomeTab extends AbstractComponent {
  mount() {
    this.props.form.querySelector('select[name="eco"]').addEventListener('change', event => {
      event.preventDefault();
      const openingsTable = new OpeningsTable(
        this.props.form.querySelector('table'),
        {
          modal: this.props.modal,
          openings: Opening.byEco(event.target.value)
        }
      );
      openingsTable.mount();
      this.props.form.querySelector('input[name="name"]').value = '';
      this.props.form.querySelector('input[name="movetext"]').value = '';
    });

    this.el.addEventListener('submit', event => {
      event.preventDefault();
      const formData = new FormData(this.props.form);
      const openingsTable = new OpeningsTable(
        this.props.form.querySelector('table'),
        {
          modal: this.props.modal,
          openings: Opening.byName(formData.get('name')).filter(opening => {
            if (
              opening.eco.startsWith(formData.get('eco')) &&
              opening.movetext.startsWith(formData.get('movetext'))
            ) {
              return opening;
            }
          })
        }
      );
      openingsTable.mount();
    });
  }
}

export const openingsHomeTab = new OpeningsHomeTab(
  document.getElementById('openingsHomeTab'),
  {
    form: document.querySelector('#openingsHomeTab form')
  }
);
