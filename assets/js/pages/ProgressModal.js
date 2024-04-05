import Modal from 'bootstrap/js/dist/modal.js';
import AbstractComponent from '../AbstractComponent.js';

export class ProgressModal extends AbstractComponent {
  mount() {
    // do nothing
  }
}

export const progressModal = new ProgressModal(
  document.getElementById('progressModal'),
  {
    modal: new Modal(document.getElementById('progressModal'))
  }
);
