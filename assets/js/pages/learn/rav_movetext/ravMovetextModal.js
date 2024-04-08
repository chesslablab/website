import Modal from 'bootstrap/js/dist/modal.js';
import ravMovesTable from './ravMovesTable.js';
import { progressModal } from '../../ProgressModal.js';
import * as env from '../../../../env.js';
import * as mode from '../../../../mode.js';
import * as variant from '../../../../variant.js';

const ravMovetextModal = {
  modal: new Modal(document.getElementById('ravMovetextModal')),
  form: document.querySelector('#ravMovetextModal form')
}

ravMovetextModal.form.getElementsByTagName('select')[0].addEventListener('change', event => {
  event.preventDefault();
  if (event.target.value === variant.CHESS_960) {
    ravMovetextModal.form.getElementsByClassName('startPos')[0].classList.remove('d-none');
  } else {
    ravMovetextModal.form.getElementsByClassName('startPos')[0].classList.add('d-none');
  }
});

ravMovetextModal.form.addEventListener('submit', event => {
  event.preventDefault();
  progressModal.props.modal.show();
  const formData = new FormData(ravMovetextModal.form);
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
    ravMovesTable.current = res.fen.length - 1;
    ravMovesTable.props.chessboard.setPosition(res.fen[res.fen.length - 1]);
    ravMovesTable.props = {
      ...ravMovesTable.props,
      filtered: res.filtered,
      breakdown: res.breakdown,
      fen: res.fen
    };
    ravMovesTable.mount();
  })
  .catch(error => {
    // TODO
  })
  .finally(() => {
    ravMovetextModal.modal.hide();
    progressModal.props.modal.hide();
  });
});

export default ravMovetextModal;
