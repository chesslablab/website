import { infoModal } from './InfoModal.js';
import { progressModal } from './ProgressModal.js';

export default class RootComponent {
  el;
  props;
  infoModal;
  progressModal;

  constructor(obj) {
    this.el = obj.el;
    this.props = obj.props();
    this.infoModal = infoModal;
    this.progressModal = progressModal;

    this.mount();
  }

  mount() {
    // abstract method
  }
}
