import { infoModal } from './InfoModal.js';
import { progressModal } from './ProgressModal.js';

export default class BaseComponent {
  el;
  props;
  infoModal;
  progressModal;

  constructor(params) {
    this.el = params.el ? params.el : null;
    this.props = params.el && params.props ? params.props() : null;
    this.infoModal = infoModal;
    this.progressModal = progressModal;

    this.mount();
  }

  mount() {
    // abstract method
  }
}
