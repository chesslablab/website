import AbstractComponent from './AbstractComponent.js';

class ExplainPositionModal extends AbstractComponent {
  mount() {
    const p = this.el.querySelector('p');
    p.replaceChildren();
    p.appendChild(document.createTextNode(this.props.explanation));
  }
}

export default ExplainPositionModal;
