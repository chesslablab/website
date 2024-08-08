import Modal from 'bootstrap/js/dist/modal.js';

export class ProgressModal {
  el;
  props;

  constructor(el, props) {
    this.el = el;
    this.props = props;
  }
}

export const progressModal = new ProgressModal(
  document.getElementById('progressModal'),
  {
    modal: new Modal(document.getElementById('progressModal'))
  }
);
