import copyInviteCodeModal from './layout/play/copyInviteCodeModal.js';
import createGameModal from './layout/play/createGameModal.js';
import drawModal from './layout/play/drawModal.js';
import enterInviteCodeModal from './layout/play/enterInviteCodeModal.js';
import friendButtons from './layout/play/friendButtons.js';
import onlineButtons from './layout/play/onlineButtons.js';
import onlinePlayersTable from './layout/play/onlinePlayersTable.js';
import playFriendModal from './layout/play/playFriendModal.js';
import rematchModal from './layout/play/rematchModal.js';
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

copyInviteCodeModal.form.addEventListener('submit', event => {
  event.preventDefault();
  const formData = new FormData(copyInviteCodeModal.form);
  navigator.clipboard.writeText(formData.get('hash')).then(() => {
    copyInviteCodeModal.modal.hide();
    infoModal.msg('Waiting for player to join...');
    infoModal.modal.show();
  }, function(err) {
    alert('Whoops! Failed to copy');
  });
});

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

drawModal.form.children.item(0).addEventListener('click', async (event) => {
  event.preventDefault();
  ws.send('/draw accept');
});

drawModal.form.children.item(1).addEventListener('click', async (event) => {
  event.preventDefault();
  ws.send('/draw decline');
});

enterInviteCodeModal.form.addEventListener('submit', event => {
  event.preventDefault();
  const formData = new FormData(enterInviteCodeModal.form);
  ws.send(`/accept ${formData.get('hash')}`);
});

friendButtons.children.item(0).addEventListener('click', async (event) => {
  event.preventDefault();
  playFriendModal.modal.show();
});

friendButtons.children.item(1).addEventListener('click', async (event) => {
  event.preventDefault();
  enterInviteCodeModal.modal.show();
});

onlineButtons.children.item(0).addEventListener('click', async (event) => {
  event.preventDefault();
  createGameModal.modal.show();
});

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

takebackModal.form.children.item(0).addEventListener('click', async (event) => {
  event.preventDefault();
  ws.send('/takeback accept');
  ws.send('/undo');
});

takebackModal.form.children.item(1).addEventListener('click', async (event) => {
  event.preventDefault();
  ws.send('/takeback decline');
});

rematchModal.form.addEventListener('submit', event => {
  event.preventDefault();
  ws.send('/rematch accept');
});

rematchModal.form.children.item(1).addEventListener('click', async (event) => {
  event.preventDefault();
  ws.send('/rematch decline');
});

infoModal.form.addEventListener('submit', event => {
  event.preventDefault();
  infoModal.modal.hide();
});
