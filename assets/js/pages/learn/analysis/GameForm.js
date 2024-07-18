import AbstractComponent from '../../../AbstractComponent.js';
import { fenWebSocket } from '../../../FenWebSocket.js';
// import { sanWebSocket } from '../../../SanWebSocket.js';
import * as mode from '../../../../mode.js';

export class GameForm extends AbstractComponent {
  mount() {
    this.el.getElementsByTagName('select')[0].addEventListener('change', event => {
      event.preventDefault();
      fenWebSocket.send(`/start ${event.target.value} ${mode.FEN}`);
    });

    this.el.addEventListener('submit', event => {
      event.preventDefault();
      const add = {
        ...(event.target.fen.value && {fen: event.target.fen.value}),
        ...(event.target.san.value && {movetext: event.target.san.value})
      };
      if (add.movetext) {
        // sanWebSocket.send(`/start ${event.target.variant.value} ${mode.SAN} "${JSON.stringify(add).replace(/"/g, '\\"')}"`);
      } else {
        fenWebSocket.send(`/start ${event.target.variant.value} ${mode.FEN} "${JSON.stringify(add).replace(/"/g, '\\"')}"`);
      }
    });
  }
}

export const gameForm = new GameForm(document.getElementById('gameForm'));
