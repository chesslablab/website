import { Chart, registerables } from 'https://cdn.jsdelivr.net/npm/chart.js@4.4.2/+esm';
import Modal from 'bootstrap/js/dist/modal.js';
import movesMetadataTable from '../../movesMetadataTable.js';
import progressModal from '../../progressModal.js';
import ws from '../../../sanWs.js';
import * as env from '../../../../env.js';
import * as mode from '../../../../mode.js';

Chart.register(...registerables);

const handleBarClick = (event, clickedElements) => {
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
      Result: event.chart.data.datasets[0].label,
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
    topOpeningsModal.modal.hide();
    progressModal.modal.hide();
  });
}

const topOpeningsModal = {
  modal: new Modal(document.getElementById('topOpeningsModal')),
  form: document.querySelector('#topOpeningsModal form'),
  mount: (res) => {
    const winRateForWhiteChart = document.getElementById('winRateForWhiteChart');
    const chart = new Chart(winRateForWhiteChart, {
      type: 'bar',
      data: {
        labels: res.winRateForWhite.map(value => value.ECO),
        datasets: [{
          label: '1-0',
          data: res.winRateForWhite.map(value => value.total),
          backgroundColor: '#f5f5f5',
          borderColor: '#404040',
          borderWidth: 2
        }]
      },
      options: {
        animation: false,
        onHover: function(event, el) {
          event.native.target.style.cursor = el[0] ? 'pointer' : 'default';
        },
        onClick: handleBarClick,
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

    const drawRateChart = document.getElementById('drawRateChart');
    new Chart(drawRateChart, {
      type: 'bar',
      data: {
        labels: res.drawRate.map(value => value.ECO),
        datasets: [{
          label: '1/2-1/2',
          data: res.drawRate.map(value => value.total),
          backgroundColor: '#888888'
        }]
      },
      options: {
        animation: false,
        onHover: function(event, el) {
          event.native.target.style.cursor = el[0] ? 'pointer' : 'default';
        },
        onClick: handleBarClick,
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

    const winRateForBlackChart = document.getElementById('winRateForBlackChart');
    new Chart(winRateForBlackChart, {
      type: 'bar',
      data: {
        labels: res.winRateForBlack.map(value => value.ECO),
        datasets: [{
          label: '0-1',
          data: res.winRateForBlack.map(value => value.total),
          backgroundColor: '#404040',
          borderColor: '#202020',
          borderWidth: 2
        }]
      },
      options: {
        animation: false,
        onHover: function(event, el) {
          event.native.target.style.cursor = el[0] ? 'pointer' : 'default';
        },
        onClick: handleBarClick,
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
  }
}

topOpeningsModal.form.addEventListener('submit', event => {
  event.preventDefault();
  topOpeningsModal.modal.hide();
});

export default topOpeningsModal;
