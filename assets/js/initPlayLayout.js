import copyInviteCode from './layout/play/copyInviteCode.js';
import draw from './layout/play/draw.js';
import enterInviteCode from './layout/play/enterInviteCode.js';
import finishedButtons from './layout/play/finishedButtons.js';
import playFriend from './layout/play/playFriend.js';
import playOnline from './layout/play/playOnline.js';
import rematch from './layout/play/rematch.js';
import startedButtons from './layout/play/startedButtons.js';
import takeback from './layout/play/takeback.js';
import ws from './layout/play/ws.js';
import gameActionsDropdown from './layout/gameActionsDropdown.js';
import gameStudyDropdown from './layout/gameStudyDropdown.js';
import historyButtons from './layout/historyButtons.js';
import infoModal from './layout/infoModal.js';
import * as action from '../action.js';
import * as mode from '../mode.js';
import * as variant from '../variant.js';

copyInviteCode.form.addEventListener('submit', event => {
  event.preventDefault();
  const formData = new FormData(copyInviteCode.form);
  navigator.clipboard.writeText(formData.get('hash')).then(() => {
    copyInviteCode.modal.hide();
    infoModal.msg('Waiting for player to join...');
    infoModal.modal.show();
  }, function(err) {
    alert('Whoops! Failed to copy');
  });
});

enterInviteCode.form.addEventListener('submit', event => {
  event.preventDefault();
  const formData = new FormData(enterInviteCode.form);
  ws.send(`/accept ${formData.get('hash')}`);
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
  localStorage.setItem('color', formData.get('color'));
  ws.send(`/start ${formData.get('variant')} ${mode.PLAY} "${JSON.stringify(add).replace(/"/g, '\\"')}"`);
  playFriend.modal.hide();
  copyInviteCode.modal.show();
});

playOnline.form.addEventListener('submit', event => {
  event.preventDefault();
  const formData = new FormData(playOnline.form);
  const add = {
    min: formData.get('minutes'),
    increment: formData.get('increment'),
    color: formData.get('color'),
    submode: 'online'
  };
  localStorage.clear();
  localStorage.setItem('color', formData.get('color'));
  ws.send(`/start ${formData.get('variant')} ${mode.PLAY} "${JSON.stringify(add).replace(/"/g, '\\"')}"`);
  playOnline.modal.hide();
  infoModal.msg('Waiting for player to join...');
  infoModal.modal.show();
});

takeback.form.addEventListener('submit', event => {
  event.preventDefault();
  ws.send('/takeback accept');
  ws.send('/undo');
});

takeback.form.children.item(1).addEventListener('click', async (event) => {
  event.preventDefault();
  ws.send('/takeback decline');
});

draw.form.addEventListener('submit', event => {
  event.preventDefault();
  ws.send('/draw accept');
});

draw.form.children.item(1).addEventListener('click', async (event) => {
  event.preventDefault();
  ws.send('/draw decline');
});

rematch.form.addEventListener('submit', event => {
  event.preventDefault();
  ws.send('/rematch accept');
});

rematch.form.children.item(1).addEventListener('click', async (event) => {
  event.preventDefault();
  ws.send('/rematch decline');
});

infoModal.form.addEventListener('submit', event => {
  event.preventDefault();
  infoModal.modal.hide();
});
