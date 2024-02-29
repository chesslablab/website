import { Opening } from "https://cdn.jsdelivr.net/npm/@chesslablab/jsblab@0.0.9/src/index.min.js";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import './styles/app.css';
import {
  ws,
  chessboardSanMovetext,
  chessboardFenString,
  playComputer,
  playFriend,
  copyInviteCode,
  waitingForPlayerToJoin,
  enterInviteCode,
  openingsEcoCode,
  openingsSanMovetext,
  openingsName
} from './init.js';
import * as mode from './modeConst.js';
import * as variant from './variantConst.js';

const openingsTableDomNode = (modal, openings, tbody) => {
  tbody.replaceChildren();
  openings.forEach(opening => {
    const tr = document.createElement('tr');
    const ecoTd = document.createElement('td');
    const ecoText = document.createTextNode(opening.eco);
    const nameTd = document.createElement('td');
    const nameText = document.createTextNode(opening.name);
    const movetextTd = document.createElement('td');
    const movetextText = document.createTextNode(opening.movetext);
    ecoTd.appendChild(ecoText);
    nameTd.appendChild(nameText);
    movetextTd.appendChild(movetextText);
    tr.appendChild(ecoTd);
    tr.appendChild(nameTd);
    tr.appendChild(movetextTd);
    tr.addEventListener('click', event => {
      const add = {
        movetext: opening.movetext
      };
      ws.send(`/start ${variant.CLASSICAL} ${mode.SAN} "${JSON.stringify(add).replace(/"/g, '\\"')}"`);
      modal.hide();
    });
    tbody.appendChild(tr);
  });
};

chessboardSanMovetext.form.addEventListener('submit', event => {
  event.preventDefault();
  const add = {
    ...(event.target.elements[1].value && {fen: event.target.elements[1].value}),
    movetext: event.target.elements[2].value
  };
  ws.send(`/start ${event.target.elements[0].value} ${mode.SAN} "${JSON.stringify(add).replace(/"/g, '\\"')}"`);

  chessboardSanMovetext.modal.hide();
});

chessboardFenString.form.addEventListener('submit', event => {
  event.preventDefault();
  const add = {
    fen: event.target.elements[1].value
  };
  localStorage.clear();
  localStorage.setItem('msg', `/start ${event.target.elements[0].value} ${mode.FEN} "${JSON.stringify(add).replace(/"/g, '\\"')}"`);

  window.location.href = chessboardFenString.form.dataset.redirect;
});

playComputer.form.addEventListener('submit', event => {
  event.preventDefault();
  const formData = new FormData(playComputer.form);
  localStorage.clear();
  localStorage.setItem('mode', mode.STOCKFISH);
  if (formData.get('level') == 1) {
    localStorage.setItem('skillLevel', 11);
    localStorage.setItem('depth', 4);
  } else if (formData.get('level') == 2) {
    localStorage.setItem('skillLevel', 17);
    localStorage.setItem('depth', 8);
  } else if (formData.get('level') == 3) {
    localStorage.setItem('skillLevel', 20);
    localStorage.setItem('depth', 12);
  } else {
    localStorage.setItem('skillLevel', 6);
    localStorage.setItem('depth', 2);
  }
  ws.send(`/start ${variant.CLASSICAL} ${mode.STOCKFISH} ${formData.get('color')}`);

  playComputer.modal.hide();
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
  localStorage.setItem('msg', `/start ${formData.get('variant')} ${mode.PLAY} "${JSON.stringify(add).replace(/"/g, '\\"')}"`);

  window.location.href = playFriend.form.dataset.redirect;
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

openingsEcoCode.form.getElementsByTagName('select')[0].addEventListener('change', event => {
  event.preventDefault();
  const openings = Opening.byEco(event.target.value);
  const tbody = openingsEcoCode.form.getElementsByTagName('tbody')[0];

  openingsTableDomNode(openingsEcoCode.modal, openings, tbody);
});

openingsSanMovetext.form.addEventListener('submit', event => {
  event.preventDefault();
  const formData = new FormData(openingsSanMovetext.form);
  const openings = Opening.byMovetext(formData.get('movetext'));
  const tbody = openingsSanMovetext.form.getElementsByTagName('tbody')[0];

  openingsTableDomNode(openingsSanMovetext.modal, openings, tbody);
});

openingsName.form.addEventListener('submit', event => {
  event.preventDefault();
  const formData = new FormData(openingsName.form);
  const openings = Opening.byName(formData.get('name'));
  const tbody = openingsName.form.getElementsByTagName('tbody')[0];

  openingsTableDomNode(openingsName.modal, openings, tbody);
});
