import Modal from 'bootstrap/js/dist/modal.js';
import AbstractComponent from '../AbstractComponent.js';

export class ExplainPositionModal extends AbstractComponent {
  mount() {
    const p = this.el.querySelector('p');
    p.replaceChildren();
    p.appendChild(document.createTextNode(this.props.explanation));
  }
}

export const explainPositionModal = new ExplainPositionModal(
  document.getElementById('explainPositionModal'),
  {
    modal: new Modal(document.getElementById('explainPositionModal')),
    explanation: ''
  }
);
