import { Pgn } from '@chesslablab/js-utils';
import Modal from 'bootstrap/js/dist/modal.js';
import AbstractComponent from '../../../AbstractComponent.js';
import { stockfishWebSocket } from '../../../StockfishWebSocket.js';

export class EndgameModal extends AbstractComponent {
  _endgameTypes = ['P'];

  mount() {
    this.props.form.addEventListener('submit', event => {
      event.preventDefault();
      const formData = new FormData(this.props.form);
      const checkmateType = formData.get('items') === 'rand'
        ? this._endgameTypes[Math.floor(Math.random() * this._endgameTypes.length)]
        : formData.get('items');
      const split = checkmateType.split(',');
      const items = split.length === 2
        ? {
            [formData.get('color')]: split[0],
            [formData.get('color') === Pgn.symbol.WHITE ? Pgn.symbol.BLACK : Pgn.symbol.WHITE]: split[1]
          }
        : {
            [formData.get('color')]: split[0]
        };
      stockfishWebSocket.send(`/randomizer ${formData.get('color')} "${JSON.stringify(items).replace(/"/g, '\\"')}"`);
      this.props.modal.hide();
    });
  }
}

export const endgameModal = new EndgameModal(
  document.getElementById('endgameModal'),
  {
    modal: new Modal(document.getElementById('endgameModal')),
    form: document.querySelector('#endgameModal form')
  }
);
