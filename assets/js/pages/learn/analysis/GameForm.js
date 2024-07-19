import AbstractComponent from '../../../AbstractComponent.js';
import { analysisWebSocket } from '../../../AnalysisWebSocket.js';
import * as mode from '../../../../mode.js';

export class GameForm extends AbstractComponent {
  mount() {
    this.el.getElementsByTagName('select')[0].addEventListener('change', event => {
      event.preventDefault();
      sessionStorage.clear();
      analysisWebSocket.send(`/start ${event.target.value} ${mode.ANALYSIS}`);
    });

    this.el.addEventListener('submit', event => {
      event.preventDefault();
      const add = {
        fen: event.target.fen.value,
        movetext: event.target.san.value
      };
      sessionStorage.clear();
      analysisWebSocket.send(`/start ${event.target.variant.value} ${mode.ANALYSIS} "${JSON.stringify(add).replace(/"/g, '\\"')}"`);
    });
  }
}

export const gameForm = new GameForm(document.getElementById('gameForm'));
