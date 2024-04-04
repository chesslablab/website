import { Opening } from '@chesslablab/jsblab';
import AbstractComponent from './AbstractComponent.js';
import OpeningsTable from './OpeningsTable.js';

class OpeningsEcoCodeModal extends AbstractComponent {
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

export default OpeningsEcoCodeModal;
