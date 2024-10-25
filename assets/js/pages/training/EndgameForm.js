import { Pgn } from '@chesslablab/js-utils';
import BaseComponent from '../../BaseComponent.js';
import { stockfishWebSocket } from '../../websockets/game/StockfishWebSocket.js';

export class EndgameForm extends BaseComponent {
  _endgameTypes = ['P'];

  mount() {
    this.el.addEventListener('submit', event => {
      event.preventDefault();
      const formData = new FormData(this.el);
      const checkmateType = formData.get('items') === 'rand'
        ? this._endgameTypes[Math.floor(Math.random() * this._endgameTypes.length)]
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

export const endgameForm = new EndgameForm(document.getElementById('endgameForm'));
