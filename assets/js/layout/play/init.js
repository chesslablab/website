import copyInviteCode from './copyInviteCode.js';
import enterInviteCode from './enterInviteCode.js';
import playFriend from './playFriend.js';
import playOnline from './playOnline.js';
import startedButtons from './startedButtons.js';
import waitingForPlayerToJoin from './waitingForPlayerToJoin.js';
import waitingForOpponentToAcceptOrDecline from './waitingForOpponentToAcceptOrDecline.js';
import takeback from './takeback.js';
import draw from './draw.js';
import resign from './resign.js';
import info from '../info.js';
import ws from './ws.js';
import gameStudyDropdown from '../gameStudyDropdown.js';
import historyButtons from '../historyButtons.js';
import * as action from '../../../action.js';
import * as mode from '../../../mode.js';
import * as variant from '../../../variant.js';

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
  localStorage.setItem('inviterColor', formData.get('color'));
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
  ws.send(`/start ${formData.get('variant')} ${mode.PLAY} "${JSON.stringify(add).replace(/"/g, '\\"')}"`);
  playOnline.modal.hide();
  waitingForPlayerToJoin.modal.show();
});

waitingForPlayerToJoin.form.addEventListener('submit', event => {
  event.preventDefault();
  window.location.href = waitingForPlayerToJoin.form.dataset.redirect;
});

waitingForOpponentToAcceptOrDecline.form.addEventListener('submit', event => {
  event.preventDefault();
  waitingForOpponentToAcceptOrDecline.modal.hide();
});

takeback.form.addEventListener('submit', event => {
  event.preventDefault();
  ws.send('/takeback accept');
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

info.form.addEventListener('submit', event => {
  event.preventDefault();
  info.modal.hide();
});
