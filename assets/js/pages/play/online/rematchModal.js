import Modal from 'bootstrap/js/dist/modal.js';
import ws from '../../../playWs.js';

const rematchModal = {
  modal: new Modal(document.getElementById('rematchModal')),
  form: document.querySelector('#rematchModal form')
}

rematchModal.form.addEventListener('submit', event => {
  event.preventDefault();
  ws.send('/rematch accept');
});

rematchModal.form.children.item(1).addEventListener('click', async (event) => {
  event.preventDefault();
  ws.send('/rematch decline');
});

export default rematchModal;
