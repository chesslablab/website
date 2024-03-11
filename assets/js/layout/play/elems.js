import { Opening } from '@chesslablab/jsblab';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  ws,
  playOnline,
  playFriend,
  copyInviteCode,
  waitingForPlayerToJoin,
  enterInviteCode,
  gameStudyDropdown
} from './init.js';
import '../../../styles/app.css';
import * as env from '../../../env.js';
import * as mode from '../../../mode.js';
import * as variant from '../../../variant.js';

playOnline.form.addEventListener('submit', event => {
  event.preventDefault();
  const formData = new FormData(playOnline.form);
  const add = {
    min: formData.get('minutes'),
    increment: formData.get('increment'),
    color: formData.get('color'),
    submode: 'online'
  };
  ws.send(`/start ${formData.get('variant')} ${mode.PLAY} "${JSON.stringify(add).replace(/"/g, '\\"')}"`);
  playOnline.modal.hide();
  waitingForPlayerToJoin.modal.show();
});

playFriend.form.getElementsByTagName('select')[0].addEventListener('change', event => {
  event.preventDefault();
  if (event.target.value === variant.CHESS_960) {
    playFriend.form.getElementsByClassName('startPos')[0].classList.remove('d-none');
  } else {
    playFriend.form.getElementsByClassName('startPos')[0].classList.add('d-none');
  }
});

playFriend.form.addEventListener('submit', event => {
  event.preventDefault();
  const formData = new FormData(playFriend.form);
  const add = {
    min: formData.get('minutes'),
    increment: formData.get('increment'),
    color: formData.get('color'),
    submode: 'friend',
    ...(formData.get('variant') === variant.CHESS_960) && {startPos: formData.get('startPos')},
    ...(formData.get('variant') === variant.CAPABLANCA_FISCHER) && {startPos: formData.get('startPos')},
    ...(formData.get('fen') && {fen: formData.get('fen')})
  };
  localStorage.clear();
  localStorage.setItem('inviterColor', formData.get('color'));
  ws.send(`/start ${formData.get('variant')} ${mode.PLAY} "${JSON.stringify(add).replace(/"/g, '\\"')}"`);
  playFriend.modal.hide();

  copyInviteCode.modal.show();
});

copyInviteCode.form.addEventListener('submit', event => {
  event.preventDefault();
  const formData = new FormData(copyInviteCode.form);
  navigator.clipboard.writeText(formData.get('hash')).then(() => {
    copyInviteCode.modal.hide();
    waitingForPlayerToJoin.modal.show();
  }, function(err) {
    alert('Whoops! Failed to copy');
  });
});

waitingForPlayerToJoin.form.addEventListener('submit', event => {
  event.preventDefault();
  window.location.href = waitingForPlayerToJoin.form.dataset.redirect;
});

enterInviteCode.form.addEventListener('submit', event => {
  event.preventDefault();
  const formData = new FormData(enterInviteCode.form);
  ws.send(`/accept ${formData.get('hash')}`);
});

gameStudyDropdown.domElem(env, ws);
