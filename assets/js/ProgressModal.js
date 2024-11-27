import Modal from 'bootstrap/js/dist/modal.js';

export class ProgressModal {
  el;
  props;

  constructor(params) {
    this.el = params.el ? params.el : null;
    this.props = params.el && params.props ? params.props() : null;
  }
}

export const progressModal = new ProgressModal({
  el: document.querySelector('#progressModal'),
  props() {
    return({
      modal: new Modal(this.el)
    });
  }
});
