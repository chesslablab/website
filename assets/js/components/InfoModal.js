import AbstractComponent from './AbstractComponent.js';

class InfoModal extends AbstractComponent {
  mount() {
    const div = this.el.querySelector('div.message');
    div.replaceChildren();
    div.appendChild(document.createTextNode(this.props.msg));
  }
}

export default InfoModal;
