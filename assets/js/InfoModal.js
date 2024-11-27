import Modal from 'bootstrap/js/dist/modal.js';
import { trans } from './i18n.js';

export class InfoModal {
  el;
  props;

  constructor(params) {
    this.el = params.el ? params.el : null;
    this.props = params.el && params.props ? params.props() : null;
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
