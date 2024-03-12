import { Opening } from '@chesslablab/jsblab';
import {
  ws,
  playOnline,
  playFriend,
  copyInviteCode,
  waitingForPlayerToJoin,
  enterInviteCode,
  gameStudyDropdown
} from './init.js';
import * as env from '../../../../env.js';
import * as mode from '../../../../mode.js';
import * as variant from '../../../../variant.js';

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

gameStudyDropdown.children.item(0).addEventListener('click', async (event) => {
  event.preventDefault();
  await fetch(`${env.API_SCHEME}://${env.API_HOST}:${env.API_PORT}/${env.API_VERSION}/download/image`, {
    method: 'POST',
    headers: {
      'X-Api-Key': `${env.API_KEY}`
    },
    body: JSON.stringify({
      fen: ws.sanMovesTable.props.fen[ws.sanMovesTable.current],
      variant: variant.CLASSICAL,
      flip: ws.chessboard.getOrientation()
    })
  })
  .then(res => res.blob())
  .then(blob => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = "chessboard.png";
    document.body.appendChild(a);
    a.click();
    a.remove();
  });
});

gameStudyDropdown.children.item(1).addEventListener('click', async (event) => {
  event.preventDefault();
  await fetch(`${env.API_SCHEME}://${env.API_HOST}:${env.API_PORT}/${env.API_VERSION}/download/mp4`, {
    method: 'POST',
    headers: {
      'X-Api-Key': `${env.API_KEY}`
    },
    body: JSON.stringify({
      variant: ws.chessboard.props.variant,
      movetext: ws.sanMovesTable.props.movetext,
      flip: ws.chessboard.getOrientation(),
      ...(ws.chessboard.props.variant === variant.CHESS_960) && {startPos: ws.chessboard.props.startPos},
      ...(ws.chessboard.props.variant === variant.CAPABLANCA_FISCHER) && {startPos: ws.chessboard.props.startPos}
    })
  })
  .then(res => res.blob())
  .then(blob => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = "chessgame.mp4";
    document.body.appendChild(a);
    a.click();
    a.remove();
  });
});
