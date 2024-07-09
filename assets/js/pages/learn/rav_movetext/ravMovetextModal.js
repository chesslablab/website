import Modal from 'bootstrap/js/dist/modal.js';
import { ravPanel } from './RavPanel.js';
import { progressModal } from '../../ProgressModal.js';
import AbstractComponent from '../../../AbstractComponent.js';
import * as env from '../../../../env.js';
import * as mode from '../../../../mode.js';
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
        const res = await fetch(`${env.API_SCHEME}://${env.API_HOST}:${env.API_PORT}/${env.API_VERSION}/play/rav`, {
          method: 'POST',
          body: JSON.stringify({
            variant: formData.get('variant'),
            movetext: formData.get('rav'),
          })
        });
        const data = await res.json();
        ravPanel.props.ravMovesBrowser.current = data.fen.length - 1;
        ravPanel.props.ravMovesBrowser.props.chessboard.setPosition(data.fen[data.fen.length - 1]);
        ravPanel.props.ravMovesBrowser.props = {
          ...ravPanel.props.ravMovesBrowser.props,
          filtered: data.filtered,
          breakdown: data.breakdown,
          fen: data.fen
        };
        ravPanel.props.ravMovesBrowser.mount();
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
