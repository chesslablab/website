import { Chart, registerables } from 'https://cdn.jsdelivr.net/npm/chart.js@4.4.2/+esm';
import Modal from 'bootstrap/js/dist/modal.js';
import blackAutocomplete from '../../../elements/blackAutocomplete.js';
import movesMetadataTable from '../../../elements/movesMetadataTable.js';
import progressModal from '../../../elements/progressModal.js';
import whiteAutocomplete from '../../../elements/whiteAutocomplete.js';
import ws from '../../../sanWs.js';
import * as env from '../../../../env.js';
import * as mode from '../../../../mode.js';

Chart.register(...registerables);

const N_BARS = 25;

const playerStatsModal = {
  modal: new Modal(document.getElementById('playerStatsModal')),
  form: document.querySelector('#playerStatsModal form')
}

const handleBarClick = (event, clickedElements) => {
  const formData = new FormData(playerStatsModal.form);
  progressModal.props.modal.show();
  if (clickedElements.length === 0) {
    return;
  }
  const { dataIndex, raw } = clickedElements[0].element.$context;
  fetch(`${env.API_SCHEME}://${env.API_HOST}:${env.API_PORT}/${env.API_VERSION}/search`, {
    method: 'POST',
    headers: {
      'X-Api-Key': `${env.API_KEY}`
    },
    body: JSON.stringify({
      White: formData.get('White'),
      Black: formData.get('Black'),
      Result: formData.get('Result'),
      ECO: event.chart.data.labels[dataIndex]
    })
  })
  .then(res => res.json())
  .then(res => {
    movesMetadataTable.props = res[0];
    movesMetadataTable.mount();
    const add = {
      movetext: res[0].movetext
    };
    ws.send(`/start classical ${mode.SAN} "${JSON.stringify(add).replace(/"/g, '\\"')}"`);
  })
  .catch(error => {
    // TODO
  })
  .finally(() => {
    playerStatsModal.modal.hide();
    progressModal.props.modal.hide();
  });
}

playerStatsModal.form.addEventListener('submit', event => {
  event.preventDefault();
  progressModal.props.modal.show();
  const formData = new FormData(playerStatsModal.form);
  const playerStatsChart = document.getElementById('playerStatsChart');
  fetch(`${env.API_SCHEME}://${env.API_HOST}:${env.API_PORT}/${env.API_VERSION}/stats/player`, {
    method: 'POST',
    headers: {
      'X-Api-Key': `${env.API_KEY}`
    },
    body: JSON.stringify({
      White: formData.get('White'),
      Black: formData.get('Black'),
      Result: formData.get('Result')
    })
  })
  .then(res => res.json())
  .then(res => {
    while (playerStatsChart.firstChild) {
      playerStatsChart.removeChild(playerStatsChart.firstChild);
    }
    const canvas = document.createElement('canvas');
    playerStatsChart.appendChild(canvas);
    const chart = new Chart(canvas, {
      type: 'bar',
      data: {
        labels: res.map(value => value.ECO).slice(0, N_BARS),
        datasets: [{
          data: res.map(value => value.total).slice(0, N_BARS),
          backgroundColor: formData.get('Result') === '1-0'
            ? '#c0c0c0'
            : formData.get('Result') === '1/2-1/2'
            ? '#888888'
            : '#404040'
        }]
      },
      options: {
        animation: false,
        categoryPercentage: 1.0,
        barPercentage: 1.0,
        onHover: function(event, el) {
          event.native.target.style.cursor = el[0] ? 'pointer' : 'default';
        },
        onClick: handleBarClick,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          x: {
            grid: {
              display: false
            }
          },
          y: {
            beginAtZero: true,
            grid: {
              display: false
            }
          }
        }
      }
    });
  })
  .catch(error => {
    // TODO
  })
  .finally(() => {
    progressModal.props.modal.hide();
  });
});

export default playerStatsModal;
