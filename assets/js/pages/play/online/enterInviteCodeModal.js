import Modal from 'bootstrap/js/dist/modal.js';
import ws from '../../../playWs.js';

const enterInviteCodeModal = {
  modal: new Modal(document.getElementById('enterInviteCodeModal')),
  form: document.querySelector('#enterInviteCodeModal form')
}

enterInviteCodeModal.form.addEventListener('submit', event => {
  event.preventDefault();
  const formData = new FormData(enterInviteCodeModal.form);
  ws.send(`/accept ${formData.get('hash')}`);
});

export default enterInviteCodeModal;
