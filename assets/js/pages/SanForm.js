import { Movetext, NOTATION_SAN } from '@chesslablab/js-utils';
import BaseComponent from '../BaseComponent.js';
import { analysisWebSocket } from '../websockets/game/AnalysisWebSocket.js';
import * as mode from '../../mode.js';
import * as variant from '../../variant.js';

export class SanForm extends BaseComponent {
  toBase64(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => resolve(fileReader.result);
      fileReader.onerror = (error) => reject(error);
    });
  };

  async upload(event) {
    return await this.toBase64(event.target.files[0]);
  };

  mount() {
    if (this.el) {
      this.props.variantSelect.addEventListener('change', event => {
        event.target.value === variant.CHESS_960
          ? this.el.querySelector('.startPos').classList.remove('d-none')
          : this.el.querySelector('.startPos').classList.add('d-none');
        analysisWebSocket.send('/start', {
          variant: event.target.value,
          mode: mode.ANALYSIS
        });
      });

      this.props.chessboardInput.addEventListener('change', event => {
        this.upload(event).then(data => {
          analysisWebSocket
            .send('/recognize', {
              data: data
            });
        });
      });

      this.el.addEventListener('submit', event => {
        event.preventDefault();
        analysisWebSocket.send('/start', {
          variant: event.target.variant.value,
          mode: mode.ANALYSIS,
          settings: {
            fen: event.target.fen.value,
            movetext: Movetext.notation(NOTATION_SAN, event.target.san.value),
            ...(event.target.startPos.value && {startPos: event.target.startPos.value})
          }
        });
      });
    }
  }
}

export const sanForm = new SanForm({
  el: document.querySelector('#sanForm'),
  props() {
    return({
      variantSelect: this.el.querySelector('select[name="variant"]'),
      fenInput: this.el.querySelector('input[name="fen"]'),
      chessboardInput: this.el.querySelector('input[name="chessboard"]'),
      startPosInput: this.el.querySelector('input[name="startPos"]')
    });
  }
});
