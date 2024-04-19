import Modal from 'bootstrap/js/dist/modal.js';
import AbstractComponent from '../../../AbstractComponent.js';
import { progressModal } from '../../ProgressModal.js';
import ravMovesBrowser from '../../ravMovesBrowser.js';
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

    this.props.form.addEventListener('submit', event => {
      event.preventDefault();
      progressModal.props.modal.show();
      const formData = new FormData(this.props.form);
      fetch(`${env.API_SCHEME}://${env.API_HOST}:${env.API_PORT}/${env.API_VERSION}/play/rav`, {
        method: 'POST',
        headers: {
          'X-Api-Key': `${env.API_KEY}`
        },
        body: JSON.stringify({
          variant: formData.get('variant'),
          movetext: formData.get('rav'),
        })
      })
      .then(res => res.json())
      .then(res => {
        ravMovesBrowser.current = res.fen.length - 1;
        ravMovesBrowser.props.chessboard.setPosition(res.fen[res.fen.length - 1]);
        ravMovesBrowser.props = {
          ...ravMovesBrowser.props,
          filtered: res.filtered,
          breakdown: res.breakdown,
          fen: res.fen
        };
        ravMovesBrowser.mount();
      })
      .catch(error => {
        // TODO
      })
      .finally(() => {
        this.props.modal.hide();
        progressModal.props.modal.hide();
      });
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
