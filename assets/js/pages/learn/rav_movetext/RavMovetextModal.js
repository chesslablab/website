import Modal from 'bootstrap/js/dist/modal.js';
import { progressModal } from '../../ProgressModal.js';
import { ravPanel } from '../../RavPanel.js';
import AbstractComponent from '../../../AbstractComponent.js';
import { annotationsWebSocket } from '../../../websockets/game/AnnotationsWebSocket.js';
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
      event.preventDefault();
      progressModal.props.modal.show();
      const formData = new FormData(this.props.form);
      const settings = {
        variant: formData.get('variant'),
        movetext: formData.get('rav'),
      };
      await annotationsWebSocket.connect();
      annotationsWebSocket
        .send(`/play_rav "${JSON.stringify(settings).replace(/"/g, '\\"')}"`)
        .watch('/play_rav', data => {
          ravPanel.props.ravMovesBrowser.current = data.fen.length - 1;
          ravPanel.props.ravMovesBrowser.props.chessboard.setPosition(data.fen[data.fen.length - 1]);
          ravPanel.props.ravMovesBrowser.props = {
            ...ravPanel.props.ravMovesBrowser.props,
            filtered: data.filtered,
            breakdown: data.breakdown,
            fen: data.fen
          };
          ravPanel.props.ravMovesBrowser.mount();
        });
      this.props.modal.hide();
      progressModal.props.modal.hide();
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
