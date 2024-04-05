import AbstractComponent from '../AbstractComponent.js';

export class InfoModal extends AbstractComponent {
  mount() {
    const div = this.el.querySelector('div.message');
    div.replaceChildren();
    div.appendChild(document.createTextNode(this.props.msg));
  }
}

export const infoModal = new InfoModal(
  document.getElementById('infoModal'),
  {
    modal: new Modal(document.getElementById('infoModal')),
    msg: ''
  }
);
