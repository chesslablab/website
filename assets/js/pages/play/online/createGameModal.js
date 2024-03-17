import Modal from 'bootstrap/js/dist/modal.js';
import infoModal from '../../../pages/infoModal.js';
import ws from '../../../playWs.js';
import * as mode from '../../../../mode.js';

const createGameModal = {
  modal: new Modal(document.getElementById('createGameModal')),
  form: document.querySelector('#createGameModal form')
}

createGameModal.form.addEventListener('submit', event => {
  event.preventDefault();
  const formData = new FormData(createGameModal.form);
  const add = {
    min: formData.get('minutes'),
    increment: formData.get('increment'),
    color: formData.get('color'),
    submode: 'online'
  };
  localStorage.setItem('color', formData.get('color'));
  ws.send(`/start ${formData.get('variant')} ${mode.PLAY} "${JSON.stringify(add).replace(/"/g, '\\"')}"`);
});

export default createGameModal;
