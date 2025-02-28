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
            movetext: Movetext.notation(NOTATION_SAN, event.target.san.value).replace(/(\r\n|\n|\r)/gm,' ')
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
      chessboardInput: this.el.querySelector('input[name="chessboard"]')
    });
  }
});
