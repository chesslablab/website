import Modal from 'bootstrap/js/dist/modal.js';
import AbstractComponent from '../AbstractComponent.js';

export class ExplainGoodMoveModal extends AbstractComponent {
  mount() {
    const text = `${this.props.pgn} is a good move for these reasons. ${this.props.paragraph}`;
    const p = this.el.querySelector('p');
    p.replaceChildren();
    p.appendChild(document.createTextNode(text));
  }
}

export const explainGoodMoveModal = new ExplainGoodMoveModal(
  document.getElementById('explainGoodMoveModal'),
  {
    modal: new Modal(document.getElementById('explainGoodMoveModal')),
    pgn: '',
    paragraph: ''
  }
);
