import Modal from 'bootstrap/js/dist/modal.js';
import progressModal from '../../../pages/progressModal.js';
import ravMovesTable from './ravMovesTable.js';
import * as env from '../../../../env.js';
import * as mode from '../../../../mode.js';
import * as variant from '../../../../variant.js';

const chessboardRavMovetextModal = {
  modal: new Modal(document.getElementById('chessboardRavMovetextModal')),
  form: document.querySelector('#chessboardRavMovetextModal form')
}

chessboardRavMovetextModal.form.getElementsByTagName('select')[0].addEventListener('change', event => {
  event.preventDefault();
  if (event.target.value === variant.CHESS_960) {
    chessboardRavMovetextModal.form.getElementsByClassName('startPos')[0].classList.remove('d-none');
  } else {
    chessboardRavMovetextModal.form.getElementsByClassName('startPos')[0].classList.add('d-none');
  }
});

chessboardRavMovetextModal.form.addEventListener('submit', event => {
  event.preventDefault();
  progressModal.modal.show();
  const formData = new FormData(chessboardRavMovetextModal.form);
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
    chessboardRavMovetextModal.modal.hide();
    progressModal.modal.hide();
  });
});

export default chessboardRavMovetextModal;
