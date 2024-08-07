import Modal from 'bootstrap/js/dist/modal.js';
import { ravPanel } from './RavPanel.js';
import { progressModal } from '../../ProgressModal.js';
import AbstractComponent from '../../../AbstractComponent.js';
import { analysisWebSocket } from '../../../websockets/game/AnalysisWebSocket.js';
import * as variant from '../../../../variant.js';

export class RavMovetextModal extends AbstractComponent {
  mount() {
    this.props.form.getElementsByTagName('select')[0].addEventListener('change', event => {
      event.preventDefault();
      if (event.target.value === variant.CHESS_960) {
        this.props.form.getElementsByClassName('startPos')[0].classList.remove('d-none');
      } else {
        this.props.form.getElementsByClassName('startPos')[0].classList.add('d-none');
      }
    });

    this.props.form.addEventListener('submit', async event => {
      try {
        event.preventDefault();
        progressModal.props.modal.show();
        const formData = new FormData(this.props.form);
        const settings = {
          variant: formData.get('variant'),
          movetext: formData.get('rav'),
        };
        await analysisWebSocket.connect();
        analysisWebSocket.send(`/play_rav "${JSON.stringify(searchSettings).replace(/"/g, '\\"')}"`);
        analysisWebSocket.watch('/play_rav', (newValue, oldValue) => {
          ravPanel.props.ravMovesBrowser.current = newValue.fen.length - 1;
          ravPanel.props.ravMovesBrowser.props.chessboard.setPosition(newValue.fen[newValue.fen.length - 1]);
          ravPanel.props.ravMovesBrowser.props = {
            ...ravPanel.props.ravMovesBrowser.props,
            filtered: newValue.filtered,
            breakdown: newValue.breakdown,
            fen: newValue.fen
          };
          ravPanel.props.ravMovesBrowser.mount();
        });
      } catch (error) {
      } finally {
        this.props.modal.hide();
        progressModal.props.modal.hide();
      }
    });
  }
}

export const ravMovetextModal = new RavMovetextModal(
  document.getElementById('ravMovetextModal'),
  {
    modal: new Modal(document.getElementById('ravMovetextModal')),
    form: document.querySelector('#ravMovetextModal form')
  }
);
