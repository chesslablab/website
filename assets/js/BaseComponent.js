import { infoModal } from './InfoModal.js';
import { progressModal } from './ProgressModal.js';

export default class BaseComponent {
  el;
  props;
  infoModal;
  progressModal;

  constructor(el, props) {
    this.el = el;
    this.props = props;
    this.infoModal = infoModal;
    this.progressModal = progressModal;

    this.mount();
  }

  mount() {
    // abstract method
  }
}
