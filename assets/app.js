import { Opening } from "https://cdn.jsdelivr.net/npm/@chesslablab/jsblab@0.0.9/src/index.min.js";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import './styles/app.css';
import * as mode from './modeConst.js';
import * as variant from './variantConst.js';

const openingsTableDomNode = (openings, tbody, redirect) => {
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
      localStorage.clear();
      localStorage.setItem('msg', `/start ${variant.CLASSICAL} ${mode.SAN} "${JSON.stringify(add).replace(/"/g, '\\"')}"`);
      window.location.href = redirect;
    });
    tbody.appendChild(tr);
  });
};

const chessboardSanMovetextModal = document.getElementById('chessboardSanMovetextModal');

const chessboardFenStringModal = document.getElementById('chessboardFenStringModal');

const playComputerModal = document.getElementById('playComputerModal');

const playFriendModal = document.getElementById('playFriendModal');

const openingsEcoCodeModal = document.getElementById('openingsEcoCodeModal');

const openingsSanMovetextModal = document.getElementById('openingsSanMovetextModal');

const openingsNameModal = document.getElementById('openingsNameModal');

chessboardSanMovetextModal.getElementsByTagName('form')[0].addEventListener('submit', event => {
  event.preventDefault();
  const add = {
    ...(event.target.elements[1].value && {fen: event.target.elements[1].value}),
    movetext: event.target.elements[2].value
  };
  localStorage.clear();
  localStorage.setItem('msg', `/start ${event.target.elements[0].value} ${mode.SAN} "${JSON.stringify(add).replace(/"/g, '\\"')}"`);

  window.location.href = chessboardSanMovetextModal.dataset.redirect;
});

chessboardFenStringModal.getElementsByTagName('form')[0].addEventListener('submit', event => {
  event.preventDefault();
  const add = {
    fen: event.target.elements[1].value
  };
  localStorage.clear();
  localStorage.setItem('msg', `/start ${event.target.elements[0].value} ${mode.FEN} "${JSON.stringify(add).replace(/"/g, '\\"')}"`);

  window.location.href = chessboardFenStringModal.dataset.redirect;
});

playComputerModal.getElementsByTagName('form')[0].addEventListener('submit', event => {
  event.preventDefault();
  const formData = new FormData(playComputerModal.getElementsByTagName('form')[0]);
  localStorage.clear();
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
  localStorage.setItem('mode', mode.STOCKFISH);
  localStorage.setItem('msg', `/start ${variant.CLASSICAL} ${mode.STOCKFISH} ${formData.get('color')}`);

  window.location.href = playComputerModal.dataset.redirect;
});

playFriendModal.getElementsByTagName('form')[0].addEventListener('submit', event => {
  event.preventDefault();
  const formData = new FormData(playFriendModal.getElementsByTagName('form')[0]);
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
  localStorage.setItem('msg', `/start ${formData.get('variant')} ${mode.PLAY} "${JSON.stringify(add).replace(/"/g, '\\"')}"`);

  // TODO

  window.location.href = playFriendModal.dataset.redirect;
});

openingsEcoCodeModal.getElementsByTagName('select')[0].addEventListener('change', event => {
  event.preventDefault();
  const openings = Opening.byEco(event.target.value);
  const tbody = openingsEcoCodeModal.getElementsByTagName('tbody')[0];

  openingsTableDomNode(openings, tbody, openingsEcoCodeModal.dataset.redirect);
});

openingsSanMovetextModal.getElementsByTagName('form')[0].addEventListener('submit', event => {
  event.preventDefault();
  const formData = new FormData(openingsSanMovetextModal.getElementsByTagName('form')[0]);
  const openings = Opening.byMovetext(formData.get('movetext'));
  const tbody = openingsSanMovetextModal.getElementsByTagName('tbody')[0];

  openingsTableDomNode(openings, tbody, openingsSanMovetextModal.dataset.redirect);
});

openingsNameModal.getElementsByTagName('form')[0].addEventListener('submit', event => {
  event.preventDefault();
  const formData = new FormData(openingsNameModal.getElementsByTagName('form')[0]);
  const openings = Opening.byName(formData.get('name'));
  const tbody = openingsNameModal.getElementsByTagName('tbody')[0];

  openingsTableDomNode(openings, tbody, openingsNameModal.dataset.redirect);
});
