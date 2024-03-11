import { Opening } from '@chesslablab/jsblab';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  ws,
  chessboardSanMovetext,
  openingsEcoCode,
  openingsSanMovetext,
  openingsName,
  gameStudyDropdown
} from './init.js';
import '../../../styles/app.css';
import * as env from '../../../env.js';
import * as mode from '../../../mode.js';
import * as variant from '../../../variant.js';

const openingsTableDomElem = (modal, openings, tbody) => {
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

openingsEcoCode.form.getElementsByTagName('select')[0].addEventListener('change', event => {
  event.preventDefault();
  const openings = Opening.byEco(event.target.value);
  const tbody = openingsEcoCode.form.getElementsByTagName('tbody')[0];
  openingsTableDomElem(openingsEcoCode.modal, openings, tbody);
});

openingsSanMovetext.form.addEventListener('submit', event => {
  event.preventDefault();
  const formData = new FormData(openingsSanMovetext.form);
  const openings = Opening.byMovetext(formData.get('movetext'));
  const tbody = openingsSanMovetext.form.getElementsByTagName('tbody')[0];
  openingsTableDomElem(openingsSanMovetext.modal, openings, tbody);
});

openingsName.form.addEventListener('submit', event => {
  event.preventDefault();
  const formData = new FormData(openingsName.form);
  const openings = Opening.byName(formData.get('name'));
  const tbody = openingsName.form.getElementsByTagName('tbody')[0];
  openingsTableDomElem(openingsName.modal, openings, tbody);
});

gameStudyDropdown.domElem(env, ws);
