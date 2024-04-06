import Modal from 'bootstrap/js/dist/modal.js';
import { sanWebSocket } from '../../../SanWebSocket.js';
import * as mode from '../../../../mode.js';

const chessboardSanMovetextModal = {
  modal: new Modal(document.getElementById('chessboardSanMovetextModal')),
  form: document.querySelector('#chessboardSanMovetextModal form')
}

chessboardSanMovetextModal.form.addEventListener('submit', event => {
  event.preventDefault();
  const add = {
    ...(event.target.elements[1].value && {fen: event.target.elements[1].value}),
    movetext: event.target.elements[2].value
  };
  sanWebSocket.send(`/start ${event.target.elements[0].value} ${mode.SAN} "${JSON.stringify(add).replace(/"/g, '\\"')}"`);
  chessboardSanMovetextModal.modal.hide();
});

export default chessboardSanMovetextModal;
