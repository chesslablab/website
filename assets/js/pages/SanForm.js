import AbstractComponent from '../AbstractComponent.js';
import { analysisWebSocket } from '../websockets/game/AnalysisWebSocket.js';
import * as mode from '../../mode.js';
import * as variant from '../../variant.js';

export class SanForm extends AbstractComponent {
  mount() {
    if (this.el) {
      this.props.variantSelect.addEventListener('change', event => {
        event.preventDefault();
        event.target.value === variant.CHESS_960
          ? this.props.startPosInput.classList.remove('d-none')
          : this.props.startPosInput.classList.add('d-none');
        sessionStorage.clear();
        analysisWebSocket.send(`/start ${event.target.value} ${mode.ANALYSIS}`);
      });

      this.el.addEventListener('submit', event => {
        event.preventDefault();
        const settings = {
          fen: event.target.fen.value,
          movetext: event.target.san.value,
          ...(event.target.startPos.value && {startPos: event.target.startPos.value})
        };
        sessionStorage.clear();
        analysisWebSocket.send(`/start ${event.target.variant.value} ${mode.ANALYSIS} "${JSON.stringify(settings).replace(/"/g, '\\"')}"`);
      });
    }
  }
}

export const sanForm = new SanForm(
  document.getElementById('sanForm'),
  {
    variantSelect: document.querySelector('#sanForm select[name="variant"]'),
    fenInput: document.querySelector('#sanForm input[name="fen"]'),
    startPosInput: document.querySelector('#sanForm input[name="startPos"]')
  }
);
