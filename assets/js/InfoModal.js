import Modal from 'bootstrap/js/dist/modal.js';
import { trans } from './i18n.js';

export class InfoModal {
  el;
  props;

  constructor(obj) {
    this.el = obj.el ? obj.el : null;
    this.props = obj.el && obj.props ? obj.props() : null;
  }

  mount() {
    const div = this.el.querySelector('div.message');
    div.replaceChildren();
    div.appendChild(document.createTextNode(`${trans(this.props.msg)}.`));
  }
}

export const infoModal = new InfoModal({
  el: document.querySelector('#infoModal'),
  props() {
    return({
      modal: new Modal(this.el),
      msg: ''
    });
  }
});
