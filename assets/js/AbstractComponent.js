import { infoModal } from './InfoModal.js';
import { progressModal } from './ProgressModal.js';

export default class AbstractComponent {
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
    throw new Error("The mount() method is an abstract method.");
  }
}
