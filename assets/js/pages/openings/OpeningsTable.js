import AbstractComponent from '../../AbstractComponent.js';
import ws from '../../sanWs.js';
import * as mode from '../../../mode.js';
import * as variant from '../../../variant.js';

class OpeningsTable extends AbstractComponent {
  mount() {
    this.el.classList.remove('d-none');
    this.el.querySelector('tbody').replaceChildren();
    this.props.openings.forEach(opening => {
      const tr = document.createElement('tr');
      const ecoTd = document.createElement('td');
      const nameTd = document.createElement('td');
      const movetextTd = document.createElement('td');
      ecoTd.appendChild(document.createTextNode(opening.eco));
      nameTd.appendChild(document.createTextNode(opening.name));
      movetextTd.appendChild(document.createTextNode(opening.movetext));
      tr.appendChild(ecoTd);
      tr.appendChild(nameTd);
      tr.appendChild(movetextTd);
      tr.addEventListener('click', event => {
        const add = {
          movetext: opening.movetext
        };
        ws.send(`/start ${variant.CLASSICAL} ${mode.SAN} "${JSON.stringify(add).replace(/"/g, '\\"')}"`);
        this.props.modal.hide();
      });
      this.el.querySelector('tbody').appendChild(tr);
    });
  };
}

export default OpeningsTable;
