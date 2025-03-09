import { infoModal } from './InfoModal.js';
import { progressModal } from './ProgressModal.js';

export default class BaseComponent {
  el;
  props;
  infoModal;
  progressModal;

  constructor(params) {
    if (params.el) {
      this.el = params.el;
      this.props = params.props ? params.props() : null;
      this.infoModal = infoModal;
      this.progressModal = progressModal;
      this.mount();
    }
  }

  mount() {
    // abstract method
  }
}
