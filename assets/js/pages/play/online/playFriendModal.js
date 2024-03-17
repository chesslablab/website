import Modal from 'bootstrap/js/dist/modal.js';
import copyInviteCodeModal from './copyInviteCodeModal.js';
import ws from '../../../layout/play/ws.js';
import * as mode from '../../../../mode.js';
import * as variant from '../../../../variant.js';

const playFriendModal = {
  modal: new Modal(document.getElementById('playFriendModal')),
  form: document.querySelector('#playFriendModal form')
}

playFriendModal.form.getElementsByTagName('select')[0].addEventListener('change', event => {
  event.preventDefault();
  if (event.target.value === variant.CHESS_960) {
    playFriendModal.form.getElementsByClassName('startPos')[0].classList.remove('d-none');
  } else {
    playFriendModal.form.getElementsByClassName('startPos')[0].classList.add('d-none');
  }
});

playFriendModal.form.addEventListener('submit', event => {
  event.preventDefault();
  const formData = new FormData(playFriendModal.form);
  const add = {
    min: formData.get('minutes'),
    increment: formData.get('increment'),
    color: formData.get('color'),
    submode: 'friend',
    ...(formData.get('variant') === variant.CHESS_960) && {startPos: formData.get('startPos')},
    ...(formData.get('variant') === variant.CAPABLANCA_FISCHER) && {startPos: formData.get('startPos')},
    ...(formData.get('fen') && {fen: formData.get('fen')})
  };
  localStorage.setItem('color', formData.get('color'));
  ws.send(`/start ${formData.get('variant')} ${mode.PLAY} "${JSON.stringify(add).replace(/"/g, '\\"')}"`);
  playFriendModal.modal.hide();
  copyInviteCodeModal.modal.show();
});

export default playFriendModal;
