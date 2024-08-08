import { progressModal } from './ProgressModal.js';

export default class AbstractComponent {
  el;

  props;

  progressModal;

  constructor(el, props) {
    this.el = el;
    this.props = props;
    this.progressModal = progressModal;

    this.mount();
  }

  mount() {
    throw new Error("The mount() method is an abstract method.");
  }
}
