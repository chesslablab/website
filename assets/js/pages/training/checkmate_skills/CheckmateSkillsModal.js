import Modal from 'bootstrap/js/dist/modal.js';
import AbstractComponent from '../../../AbstractComponent.js';
import { stockfishWebSocket } from '../../../StockfishWebSocket.js';
import * as mode from '../../../../mode.js';
import * as variant from '../../../../variant.js';

export class CheckmateSkillsModal extends AbstractComponent {
  mount() {
    this.props.form.addEventListener('submit', event => {
      event.preventDefault();
      const formData = new FormData(this.props.form);
      // TODO
    });
  }
}

export const checkmateSkillsModal = new CheckmateSkillsModal(
  document.getElementById('checkmateSkillsModal'),
  {
    modal: new Modal(document.getElementById('checkmateSkillsModal')),
    form: document.querySelector('#checkmateSkillsModal form')
  }
);
