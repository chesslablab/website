import Modal from 'bootstrap/js/dist/modal.js';
import ws from '../../../layout/stockfish/ws.js';
import * as mode from '../../../../mode.js';
import * as variant from '../../../../variant.js';

const playComputerModal = {
  modal: new Modal(document.getElementById('playComputerModal')),
  form: document.querySelector('#playComputerModal form')
}

playComputerModal.form.addEventListener('submit', event => {
  event.preventDefault();
  const formData = new FormData(playComputerModal.form);
  localStorage.setItem('mode', mode.STOCKFISH);
  if (formData.get('level') == 1) {
    localStorage.setItem('skillLevel', 11);
    localStorage.setItem('depth', 4);
  } else if (formData.get('level') == 2) {
    localStorage.setItem('skillLevel', 17);
    localStorage.setItem('depth', 8);
  } else if (formData.get('level') == 3) {
    localStorage.setItem('skillLevel', 20);
    localStorage.setItem('depth', 12);
  } else {
    localStorage.setItem('skillLevel', 6);
    localStorage.setItem('depth', 2);
  }
  ws.send(`/start ${variant.CLASSICAL} ${mode.STOCKFISH} ${formData.get('color')}`);
  playComputerModal.modal.hide();
});

export default playComputerModal;
