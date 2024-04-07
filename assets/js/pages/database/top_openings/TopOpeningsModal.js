import Modal from 'bootstrap/js/dist/modal.js';
import { Chart, registerables } from 'https://cdn.jsdelivr.net/npm/chart.js@4.4.2/+esm';
import movesMetadataTable from '../../movesMetadataTable.js';
import { progressModal } from '../../ProgressModal.js';
import AbstractComponent from '../../../AbstractComponent.js';
import { sanWebSocket } from '../../../SanWebSocket.js';
import * as env from '../../../../env.js';
import * as mode from '../../../../mode.js';

Chart.register(...registerables);

export class TopOpeningsModal extends AbstractComponent {
  _nBars = 25;

  mount() {
    const handleBarClick = (event, clickedElements) => {
      this.props.progressModal.props.modal.show();
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
        this.props.movesMetadataTable.props = res[0];
        this.props.movesMetadataTable.mount();
        const add = {
          movetext: res[0].movetext
        };
        sanWebSocket.send(`/start classical ${mode.SAN} "${JSON.stringify(add).replace(/"/g, '\\"')}"`);
      })
      .catch(error => {
        // TODO
      })
      .finally(() => {
        this.props.modal.hide();
        this.props.progressModal.props.modal.hide();
      });
    }

    const options = {
      animation: false,
      categoryPercentage: 1.0,
      barPercentage: 1.0,
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

    if (this.props.stats?.winRateForWhite) {
      new Chart(document.getElementById('winRateForWhiteChart'), {
        type: 'bar',
        data: {
          labels: this.props.stats.winRateForWhite.map(value => value.ECO).slice(0, this._nBars),
          datasets: [{
            label: '1-0',
            data: this.props.stats.winRateForWhite.map(value => value.total).slice(0, this._nBars),
            backgroundColor: '#c0c0c0'
          }]
        },
        options: options
      });
    }

    if (this.props.stats?.drawRate) {
      new Chart(document.getElementById('drawRateChart'), {
        type: 'bar',
        data: {
          labels: this.props.stats.drawRate.map(value => value.ECO).slice(0, this._nBars),
          datasets: [{
            label: '1/2-1/2',
            data: this.props.stats.drawRate.map(value => value.total).slice(0, this._nBars),
            backgroundColor: '#888888'
          }]
        },
        options: options
      });
    }

    if (this.props.stats?.winRateForBlack) {
      new Chart(document.getElementById('winRateForBlackChart'), {
        type: 'bar',
        data: {
          labels: this.props.stats.winRateForBlack.map(value => value.ECO).slice(0, this._nBars),
          datasets: [{
            label: '0-1',
            data: this.props.stats.winRateForBlack.map(value => value.total).slice(0, this._nBars),
            backgroundColor: '#404040'
          }]
        },
        options: options
      });
    }
  }
}

export const topOpeningsModal = new TopOpeningsModal(
  document.getElementById('topOpeningsModal'),
  {
    modal: new Modal(document.getElementById('topOpeningsModal')),
    form: document.querySelector('#topOpeningsModal form'),
    movesMetadataTable: movesMetadataTable,
    progressModal: progressModal,
    stats: {}
  }
);
