import Modal from 'bootstrap/js/dist/modal.js';
import ws from '../../../layout/play/ws.js';

const takebackModal = {
  modal: new Modal(document.getElementById('takebackModal')),
  form: document.querySelector('#takebackModal form')
}

takebackModal.form.children.item(0).addEventListener('click', async (event) => {
  event.preventDefault();
  ws.send('/takeback accept');
  ws.send('/undo');
});

takebackModal.form.children.item(1).addEventListener('click', async (event) => {
  event.preventDefault();
  ws.send('/takeback decline');
});

export default takebackModal;
