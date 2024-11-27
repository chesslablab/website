import { infoModal } from './InfoModal.js';
import { progressModal } from './ProgressModal.js';

export default class BaseComponent {
  el;
  props;
  infoModal;
  progressModal;

  constructor(obj) {
    this.el = obj.el ? obj.el : null;
    this.props = obj.el && obj.props ? obj.props() : null;
    this.infoModal = infoModal;
    this.progressModal = progressModal;

    this.mount();
  }

  mount() {
    // abstract method
  }
}
