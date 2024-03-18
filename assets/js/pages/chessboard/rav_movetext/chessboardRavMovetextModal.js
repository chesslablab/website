import Modal from 'bootstrap/js/dist/modal.js';
import * as mode from '../../../../mode.js';

const chessboardRavMovetextModal = {
  modal: new Modal(document.getElementById('chessboardRavMovetextModal')),
  form: document.querySelector('#chessboardRavMovetextModal form')
}

chessboardRavMovetextModal.form.addEventListener('submit', event => {
  event.preventDefault();
  // TODO
});

export default chessboardRavMovetextModal;
