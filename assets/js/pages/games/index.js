import { Movetext, NOTATION_SAN } from '@chesslablab/js-utils';
import { blackAutocomplete } from '../BlackAutocomplete.js';
import { eventAutocomplete } from '../EventAutocomplete.js';
import { whiteAutocomplete } from '../WhiteAutocomplete.js';
import BaseComponent from '../../BaseComponent.js';
import { binaryWebSocket } from '../../websockets/BinaryWebSocket.js';
import { dataWebSocket } from '../../websockets/DataWebSocket.js';
import { analysisWebSocket } from '../../websockets/game/AnalysisWebSocket.js';
import * as mode from '../../../mode.js';
import * as variant from '../../../variant.js';

class SearchGamesForm extends BaseComponent {
  mount() {
    this.el.addEventListener('submit', async (event) => {
      event.preventDefault();
      this.progressModal.props.modal.show();
      const formData = new FormData(this.el);
      dataWebSocket
        .send('/search', {
          Event: formData.get('Event'),
          Date: formData.get('Date'),
          White: formData.get('White'),
          Black: formData.get('Black'),
          Result: formData.get('Result'),
          ECO: formData.get('ECO'),
          movetext: Movetext.notation(NOTATION_SAN, formData.get('movetext')),
        })
        .onChange('/search', data => {
          this.el.querySelector('table').classList.remove('d-none');
          this.el.querySelector('tbody').replaceChildren();
          data.forEach(game => {
            const tr = document.createElement('tr');
            const eventTd = document.createElement('td');
            const ecoTd = document.createElement('td');
            const whiteTd = document.createElement('td');
            const whiteEloTd = document.createElement('td');
            const blackTd = document.createElement('td');
            const blackEloTd = document.createElement('td');
            eventTd.appendChild(document.createTextNode(game.Event));
            ecoTd.appendChild(document.createTextNode(game.ECO));
            whiteTd.appendChild(document.createTextNode(game.White));
            whiteEloTd.appendChild(document.createTextNode(game.WhiteElo));
            blackTd.appendChild(document.createTextNode(game.Black));
            blackEloTd.appendChild(document.createTextNode(game.BlackElo));
            tr.appendChild(eventTd);
            tr.appendChild(ecoTd);
            tr.appendChild(whiteTd);
            tr.appendChild(whiteEloTd);
            tr.appendChild(blackTd);
            tr.appendChild(blackEloTd);
            tr.addEventListener('click', () => {
              const siblings = [...tr.parentElement.children].filter(child => child !== tr);
              siblings.forEach(item => item.classList.remove('table-active'));
              tr.classList.add('table-active');
              analysisWebSocket.send('/start', {
                variant: variant.CLASSICAL,
                mode: mode.ANALYSIS,
                settings: {
                  movetext: game.movetext
                }
              });
              this.props.movesMetadataTable.props = game;
              this.props.movesMetadataTable.mount();
            });
            this.el.querySelector('tbody').appendChild(tr);
          });
          this.progressModal.props.modal.hide();
        });
    });
  }
}

try {
  await Promise.all([
    binaryWebSocket.connect(),
    dataWebSocket.connect(),
    analysisWebSocket.connect()
  ]);
} catch {}

const searchGamesForm = new SearchGamesForm({
  el: document.querySelector('#searchGamesForm'),
  props() {
    return({
      movesMetadataTable: new BaseComponent({
        el: document.querySelector('#movesMetadataTable tbody'),
        props() {
          return({});
        }
      })
    });
  }
});
