import copyInviteCode from './layout/play/copyInviteCode.js';
import createGame from './layout/play/createGame.js';
import draw from './layout/play/draw.js';
import enterInviteCode from './layout/play/enterInviteCode.js';
import onlinePlayers from './layout/play/onlinePlayers.js';
import playFriend from './layout/play/playFriend.js';
import rematch from './layout/play/rematch.js';
import startButtons from './layout/play/startButtons.js';
import startedButtons from './layout/play/startedButtons.js';
import takebackModal from './layout/play/takebackModal.js';
import { timerTable, timerTableInterval } from './layout/play/timerTable.js';
import ws from './layout/play/ws.js';
import gameActionsDropdown from './layout/gameActionsDropdown.js';
import gameStudyDropdown from './layout/gameStudyDropdown.js';
import historyButtons from './layout/historyButtons.js';
import infoModal from './layout/infoModal.js';
import * as action from '../action.js';
import * as mode from '../mode.js';
import * as variant from '../variant.js';

localStorage.clear();

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
  localStorage.setItem('color', formData.get('color'));
  ws.send(`/start ${formData.get('variant')} ${mode.PLAY} "${JSON.stringify(add).replace(/"/g, '\\"')}"`);
  playFriend.modal.hide();
  copyInviteCode.modal.show();
});

createGame.form.addEventListener('submit', event => {
  event.preventDefault();
  const formData = new FormData(createGame.form);
  const add = {
    min: formData.get('minutes'),
    increment: formData.get('increment'),
    color: formData.get('color'),
    submode: 'online'
  };
  localStorage.setItem('color', formData.get('color'));
  ws.send(`/start ${formData.get('variant')} ${mode.PLAY} "${JSON.stringify(add).replace(/"/g, '\\"')}"`);
});

takebackModal.form.children.item(0).addEventListener('click', async (event) => {
  event.preventDefault();
  ws.send('/takeback accept');
  ws.send('/undo');
});

takebackModal.form.children.item(1).addEventListener('click', async (event) => {
  event.preventDefault();
  ws.send('/takeback decline');
});

draw.form.children.item(0).addEventListener('click', async (event) => {
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

startButtons.children.item(0).addEventListener('click', async (event) => {
  event.preventDefault();
  createGame.modal.show();
});
