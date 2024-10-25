import { Movetext, NOTATION_SAN } from '@chesslablab/js-utils';
import { Chart, registerables } from 'https://cdn.jsdelivr.net/npm/chart.js@4.4.2/+esm';
import { blackAutocomplete } from '../BlackAutocomplete.js';
import { eventAutocomplete } from '../EventAutocomplete.js';
import movesMetadataTable from '../movesMetadataTable.js';
import { whiteAutocomplete } from '../WhiteAutocomplete.js';
import AbstractComponent from '../../AbstractComponent.js';
import { analysisWebSocket } from '../../websockets/game/AnalysisWebSocket.js';
import { dataWebSocket } from '../../websockets/data/DataWebSocket.js';
import * as mode from '../../../mode.js';
import * as variant from '../../../variant.js';

Chart.register(...registerables);

export class SearchGamesForm extends AbstractComponent {
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
          const tbody = this.el.getElementsByTagName('tbody')[0];
          tbody.parentNode.classList.add('mt-3');
          tbody.replaceChildren();
          data.forEach(game => {
            const tr = document.createElement('tr');
            const eventTd = document.createElement('td');
            const yearTd = document.createElement('td');
            const ecoTd = document.createElement('td');
            const whiteTd = document.createElement('td');
            const whiteEloTd = document.createElement('td');
            const blackTd = document.createElement('td');
            const blackEloTd = document.createElement('td');
            const resultTd = document.createElement('td');

            eventTd.appendChild(document.createTextNode(game.Event));
            yearTd.appendChild(document.createTextNode(parseInt(game.Date)));
            ecoTd.appendChild(document.createTextNode(game.ECO));
            whiteTd.appendChild(document.createTextNode(game.White));
            whiteEloTd.appendChild(document.createTextNode(game.WhiteElo));
            blackTd.appendChild(document.createTextNode(game.Black));
            blackEloTd.appendChild(document.createTextNode(game.BlackElo));
            resultTd.appendChild(document.createTextNode(game.Result));

            tr.appendChild(eventTd);
            tr.appendChild(yearTd);
            tr.appendChild(ecoTd);
            tr.appendChild(whiteTd);
            tr.appendChild(whiteEloTd);
            tr.appendChild(blackTd);
            tr.appendChild(blackEloTd);
            tr.appendChild(resultTd);

            tr.addEventListener('click', event => {
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

            tbody.appendChild(tr);
          });

          this.progressModal.props.modal.hide();
        });
    });
  }
}

export const searchGamesForm = new SearchGamesForm(
  document.getElementById('searchGamesForm'),
  {
    movesMetadataTable: movesMetadataTable
  }
);
