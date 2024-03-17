import Modal from 'bootstrap/js/dist/modal.js';
import ws from '../../../layout/play/ws.js';

const drawModal = {
  modal: new Modal(document.getElementById('drawModal')),
  form: document.querySelector('#drawModal form')
}

drawModal.form.children.item(0).addEventListener('click', async (event) => {
  event.preventDefault();
  ws.send('/draw accept');
});

drawModal.form.children.item(1).addEventListener('click', async (event) => {
  event.preventDefault();
  ws.send('/draw decline');
});

export default drawModal;
