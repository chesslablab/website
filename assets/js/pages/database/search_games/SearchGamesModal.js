import Modal from 'bootstrap/js/dist/modal.js';
import { Chart, registerables } from 'https://cdn.jsdelivr.net/npm/chart.js@4.4.2/+esm';
import { blackAutocomplete } from '../../BlackAutocomplete.js';
import { eventAutocomplete } from '../../EventAutocomplete.js';
import movesMetadataTable from '../../movesMetadataTable.js';
import { progressModal } from '../../ProgressModal.js';
import { whiteAutocomplete } from '../../WhiteAutocomplete.js';
import AbstractComponent from '../../../AbstractComponent.js';
import { analysisWebSocket } from '../../../AnalysisWebSocket.js';
import * as env from '../../../../env.js';
import * as mode from '../../../../mode.js';

Chart.register(...registerables);

export class SearchGamesModal extends AbstractComponent {
  mount() {
    this.props.form.addEventListener('submit', async (event) => {
      try {
        event.preventDefault();
        this.props.progressModal.props.modal.show();
        const formData = new FormData(this.props.form);
        const res = await fetch(`${env.apiEndpoint()}/search`, {
          method: 'POST',
          body: JSON.stringify({
            Event: formData.get('Event'),
            Date: formData.get('Date'),
            White: formData.get('White'),
            Black: formData.get('Black'),
            Result: formData.get('Result'),
            ECO: formData.get('ECO'),
            movetext: formData.get('movetext')
          })
        });
        const tbody = this.props.form.getElementsByTagName('tbody')[0];
        tbody.parentNode.classList.add('mt-3');
        tbody.replaceChildren();
        (await res.json()).forEach(game => {
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
            const settings = {
              movetext: game.movetext
            };
            analysisWebSocket.send(`/start classical ${mode.ANALYSIS} "${JSON.stringify(settings).replace(/"/g, '\\"')}"`);
            this.props.movesMetadataTable.props = game;
            this.props.movesMetadataTable.mount();
            this.props.modal.hide();
          });

          tbody.appendChild(tr);
        })
      } catch (error) {
      } finally {
        this.props.progressModal.props.modal.hide();
        this.props.modal.show();
      }
    });
  }
}

export const searchGamesModal = new SearchGamesModal(
  document.getElementById('searchGamesModal'),
  {
    modal: new Modal(document.getElementById('searchGamesModal')),
    form: document.querySelector('#searchGamesModal form'),
    movesMetadataTable: movesMetadataTable,
    progressModal: progressModal
  }
);
