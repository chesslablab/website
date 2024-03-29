import { Chart, registerables } from 'https://cdn.jsdelivr.net/npm/chart.js@4.4.2/+esm';
import Modal from 'bootstrap/js/dist/modal.js';
import eventAutocomplete from '../../eventAutocomplete.js';
import movesMetadataTable from '../../movesMetadataTable.js';
import progressModal from '../../progressModal.js';
import ws from '../../../sanWs.js';
import * as env from '../../../../env.js';
import * as mode from '../../../../mode.js';

Chart.register(...registerables);

const N_BARS = 25;

const eventStatsModal = {
  modal: new Modal(document.getElementById('eventStatsModal')),
  form: document.querySelector('#eventStatsModal form')
}

const handleBarClick = (event, clickedElements) => {
  const formData = new FormData(eventStatsModal.form);
  progressModal.modal.show();
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
      Event: formData.get('Event'),
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
    eventStatsModal.modal.hide();
    progressModal.modal.hide();
  });
}

eventStatsModal.form.addEventListener('submit', event => {
  event.preventDefault();
  progressModal.modal.show();
  const formData = new FormData(eventStatsModal.form);
  const eventStatsChart = document.getElementById('eventStatsChart');
  fetch(`${env.API_SCHEME}://${env.API_HOST}:${env.API_PORT}/${env.API_VERSION}/stats/event`, {
    method: 'POST',
    headers: {
      'X-Api-Key': `${env.API_KEY}`
    },
    body: JSON.stringify({
      Event: formData.get('Event'),
      Result: formData.get('Result')
    })
  })
  .then(res => res.json())
  .then(res => {
    while (eventStatsChart.firstChild) {
      eventStatsChart.removeChild(eventStatsChart.firstChild);
    }
    const canvas = document.createElement('canvas');
    eventStatsChart.appendChild(canvas);
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
    progressModal.modal.hide();
  });
});

export default eventStatsModal;
