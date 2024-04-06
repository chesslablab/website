import Modal from 'bootstrap/js/dist/modal.js';
import AbstractComponent from '../../../AbstractComponent.js';
import { playWebSocket } from '../../../PlayWebSocket.js';

export class DrawModal extends AbstractComponent {
  mount() {
    this.props.form.children.item(0).addEventListener('click', async (event) => {
      event.preventDefault();
      playWebSocket.send('/draw accept');
    });

    this.props.form.children.item(1).addEventListener('click', async (event) => {
      event.preventDefault();
      playWebSocket.send('/draw decline');
    });
  }
}

export const drawModal = new DrawModal(
  document.getElementById('drawModal'),
  {
    modal: new Modal(document.getElementById('drawModal')),
    form: document.querySelector('#drawModal form')
  }
);
