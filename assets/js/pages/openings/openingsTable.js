import ws from '../../layout/san/ws.js';
import * as mode from '../../../mode.js';
import * as variant from '../../../variant.js';

const openingsTable = (modal, openings, tbody) => {
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

export default openingsTable;
