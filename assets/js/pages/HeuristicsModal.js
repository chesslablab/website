import Modal from 'bootstrap/js/dist/modal.js';
import AbstractComponent from '../AbstractComponent.js';

export class HeuristicsModal extends AbstractComponent {
  mount() {
    // ...
  }
}

export const heuristicsModal = new HeuristicsModal(
  document.getElementById('heuristicsModal'),
  {
    modal: new Modal(document.getElementById('heuristicsModal')),
    form: document.querySelector('#heuristicsModal form'),
    chart: document.getElementById('chart')
  }
);
