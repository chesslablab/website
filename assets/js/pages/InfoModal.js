import Modal from 'bootstrap/js/dist/modal.js';
import AbstractComponent from '../AbstractComponent.js';
import { trans } from '../i18n.js';

export class InfoModal extends AbstractComponent {
  mount() {
    const div = this.el.querySelector('div.message');
    div.replaceChildren();
    div.appendChild(document.createTextNode(`${trans(this.props.msg)}.`));
  }
}

export const infoModal = new InfoModal(
  document.getElementById('infoModal'),
  {
    modal: new Modal(document.getElementById('infoModal')),
    msg: ''
  }
);
