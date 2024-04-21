import Modal from 'bootstrap/js/dist/modal.js';
import { Chart, registerables } from 'https://cdn.jsdelivr.net/npm/chart.js@4.4.2/+esm';
import { blackAutocomplete } from '../../BlackAutocomplete.js';
import { eventAutocomplete } from '../../EventAutocomplete.js';
import movesMetadataTable from '../../movesMetadataTable.js';
import { progressModal } from '../../ProgressModal.js';
import { whiteAutocomplete } from '../../WhiteAutocomplete.js';
import AbstractComponent from '../../../AbstractComponent.js';
import { sanWebSocket } from '../../../SanWebSocket.js';
import * as env from '../../../../env.js';
import * as mode from '../../../../mode.js';

Chart.register(...registerables);

export class SearchGamesModal extends AbstractComponent {
  mount() {
    this.props.form.addEventListener('submit', event => {
      event.preventDefault();
      this.props.progressModal.props.modal.show();
      const formData = new FormData(this.props.form);
      fetch(`${env.API_SCHEME}://${env.API_HOST}:${env.API_PORT}/${env.API_VERSION}/search`, {
        method: 'POST',
        headers: {
          'X-Api-Key': `${env.API_KEY}`
        },
        body: JSON.stringify({
          Event: formData.get('Event'),
          Date: formData.get('Date'),
          White: formData.get('White'),
          Black: formData.get('Black'),
          Result: formData.get('Result'),
          ECO: formData.get('ECO'),
          movetext: formData.get('movetext')
        })
      })
      .then(res => res.json())
      .then(res => {
        const tbody = this.props.form.getElementsByTagName('tbody')[0];
        tbody.parentNode.classList.add('mt-3');
        tbody.replaceChildren();
        res.forEach(game => {
          const tr = document.createElement('tr');
          const eventTd = document.createElement('td');
          const eventText = document.createTextNode(game.Event);
          const yearTd = document.createElement('td');
          const yearText = document.createTextNode(parseInt(game.Date));
          const ecoTd = document.createElement('td');
          const ecoText = document.createTextNode(game.ECO);
          const whiteTd = document.createElement('td');
          const whiteText = document.createTextNode(game.White);
          const whiteEloTd = document.createElement('td');
          const whiteEloText = document.createTextNode(game.WhiteElo);
          const blackTd = document.createElement('td');
          const blackText = document.createTextNode(game.Black);
          const blackEloTd = document.createElement('td');
          const blackEloText = document.createTextNode(game.BlackElo);
          const resultTd = document.createElement('td');
          const resultText = document.createTextNode(game.Result);

          eventTd.appendChild(eventText);
          yearTd.appendChild(yearText);
          ecoTd.appendChild(ecoText);
          whiteTd.appendChild(whiteText);
          whiteEloTd.appendChild(whiteEloText);
          blackTd.appendChild(blackText);
          blackEloTd.appendChild(blackEloText);
          resultTd.appendChild(resultText);

          tr.appendChild(eventTd);
          tr.appendChild(yearTd);
          tr.appendChild(ecoTd);
          tr.appendChild(whiteTd);
          tr.appendChild(whiteEloTd);
          tr.appendChild(blackTd);
          tr.appendChild(blackEloTd);
          tr.appendChild(resultTd);

          tr.addEventListener('click', event => {
            const add = {
              movetext: game.movetext
            };
            sanWebSocket.send(`/start classical ${mode.SAN} "${JSON.stringify(add).replace(/"/g, '\\"')}"`);
            this.props.movesMetadataTable.props = game;
            this.props.movesMetadataTable.mount();
            this.props.modal.hide();
          });

          tbody.appendChild(tr);
        })
      })
      .catch(error => {
        // TODO
      })
      .finally(() => {
        this.props.progressModal.props.modal.hide();
        this.props.modal.show();
      });
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
