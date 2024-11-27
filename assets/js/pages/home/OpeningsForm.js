import { Opening } from '@chesslablab/js-utils';
import OpeningsTable from './OpeningsTable.js';
import BaseComponent from '../../BaseComponent.js';

export class OpeningsForm extends BaseComponent {
  mount() {
    this.el.querySelector('select[name="eco"]').addEventListener('change', event => {
      event.preventDefault();
      const openingsTable = new OpeningsTable({
        el: this.el.querySelector('table'),
        props() {
          return({
            openings: Opening.byEco(event.target.value)
          });
        }
      });
      this.el.querySelector('input[name="name"]').value = '';
      this.el.querySelector('input[name="movetext"]').value = '';
    });

    this.el.addEventListener('submit', event => {
      event.preventDefault();
      const formData = new FormData(this.el);
      const openingsTable = new OpeningsTable({
        el: this.el.querySelector('table'),
        props() {
          return({
            openings: Opening.byName(formData.get('name')).filter(opening => {
              if (opening.eco.startsWith(formData.get('eco')) && 
                opening.movetext.startsWith(formData.get('movetext'))
              ) {
                return opening;
              }
            })
          });
        }
      });
    });
  }
}

export const openingsForm = new OpeningsForm({
  el: document.querySelector('#openingsForm')
});
