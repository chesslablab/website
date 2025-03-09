import Modal from 'bootstrap/js/dist/modal.js';
import BaseComponent from '../../../BaseComponent.js';
import { binaryWebSocket } from '../../../websockets/BinaryWebSocket.js';
import { stockfishWebSocket } from '../../../websockets/game/StockfishWebSocket.js';
import * as mode from '../../../../mode.js';
import * as variant from '../../../../variant.js';

class PlayComputerModal extends BaseComponent {
  mount() {
    this.props.form.addEventListener('submit', event => {
      event.preventDefault();
      const formData = new FormData(this.props.form);
      let skillLevel = 6;
      let depth = 2;
      if (formData.get('level') == 1) {
        skillLevel = 11;
        depth = 4;
      } else if (formData.get('level') == 2) {
        skillLevel = 17;
        depth = 8;
      } else if (formData.get('level') == 3) {
        skillLevel = 20;
        depth = 12;
      }
      stockfishWebSocket.send('/start', {
        variant: variant.CLASSICAL,
        mode: mode.STOCKFISH,
        settings: {
          skillLevel: skillLevel,
          depth: depth,
          ...(formData.get('color') && {color: formData.get('color')}),
          ...(formData.get('fen') && {fen: formData.get('fen')})
        }
      });
      this.props.modal.hide();
    });
  }
}

try {
  await Promise.all([
    binaryWebSocket.connect(),
    stockfishWebSocket.connect()
  ]);
} catch {}

const playComputerModal = new PlayComputerModal({
  el: document.querySelector('#playComputerModal'),
  props() {
    return({
      modal: new Modal(this.el),
      form: this.el.querySelector('form')
    });
  }
});

playComputerModal.props.modal.show();
