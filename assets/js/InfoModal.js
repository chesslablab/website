import Modal from 'bootstrap/js/dist/modal.js';
import { trans } from './i18n.js';

export class InfoModal {
  el;
  props;

  constructor(el, props) {
    this.el = el;
    this.props = props;
  }

  mount() {
    const div = this.el.querySelector('div.message');
    div.replaceChildren();
    div.appendChild(document.createTextNode(`${trans(this.props.msg)}.`));
  }
}

export const infoModal = new InfoModal(
  document.querySelector('#infoModal'),
  {
    modal: new Modal(document.querySelector('#infoModal')),
    msg: ''
  }
);
