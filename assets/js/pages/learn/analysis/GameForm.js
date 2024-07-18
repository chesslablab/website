import AbstractComponent from '../../../AbstractComponent.js';
import { sanWebSocket } from '../../../SanWebSocket.js';
import * as mode from '../../../../mode.js';

export class GameForm extends AbstractComponent {
  mount() {
    this.el.getElementsByTagName('select')[0].addEventListener('change', event => {
      event.preventDefault();
      sanWebSocket.send(`/start ${event.target.value} ${mode.SAN}`);
    });

    this.el.addEventListener('submit', event => {
      event.preventDefault();
      const add = {
        fen: event.target.fen.value,
        movetext: event.target.san.value
      };
      sanWebSocket.send(`/start ${event.target.variant.value} ${mode.SAN} "${JSON.stringify(add).replace(/"/g, '\\"')}"`);
    });
  }
}

export const gameForm = new GameForm(document.getElementById('gameForm'));
