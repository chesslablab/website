import { Pgn } from '@chesslablab/js-utils';
import BaseComponent from '../../BaseComponent.js';
import { stockfishWebSocket } from '../../websockets/game/StockfishWebSocket.js';

export class CheckmateForm extends BaseComponent {
  _checkmateTypes = ['QR,R', 'Q', 'R', 'BB', 'BN'];

  mount() {
    this.el.addEventListener('submit', event => {
      event.preventDefault();
      const formData = new FormData(this.el);
      const checkmateType = formData.get('items') === 'rand'
        ? this._checkmateTypes[Math.floor(Math.random() * this._checkmateTypes.length)]
        : formData.get('items');
      const split = checkmateType.split(',');
      stockfishWebSocket.send('/randomizer', {
        turn: formData.get('color'),
        items: split.length === 2
          ? {
              [formData.get('color')]: split[0],
              [formData.get('color') === Pgn.symbol.WHITE ? Pgn.symbol.BLACK : Pgn.symbol.WHITE]: split[1]
            }
          : {
              [formData.get('color')]: split[0]
          }
      });
    });
  }
}

export const checkmateForm = new CheckmateForm(document.querySelector('#checkmateForm'));
