import Modal from 'bootstrap/js/dist/modal.js';
import { Chart, registerables } from 'https://cdn.jsdelivr.net/npm/chart.js@4.4.2/+esm';
import { dataWebSocket } from '../../../websockets/data/DataWebSocket.js';
import movesMetadataTable from '../../movesMetadataTable.js';
import { progressModal } from '../../ProgressModal.js';
import AbstractComponent from '../../../AbstractComponent.js';
import { analysisWebSocket } from '../../../websockets/game/AnalysisWebSocket.js';
import * as mode from '../../../../mode.js';

Chart.register(...registerables);

export class TopOpeningsModal extends AbstractComponent {
  _nBars = 25;

  mount() {
    const handleBarClick = async (event, clickedElements) => {
      try {
        if (clickedElements.length === 0) {
          return;
        }
        this.props.progressModal.props.modal.show();
        const { dataIndex, raw } = clickedElements[0].element.$context;
        await dataWebSocket.connect();
        const searchSettings = {
          Result: event.chart.data.datasets[0].label,
          ECO: event.chart.data.labels[dataIndex]
        };
        dataWebSocket.send(`/search "${JSON.stringify(searchSettings).replace(/"/g, '\\"')}"`);
        dataWebSocket.watchResponse('/search', (newValue, oldValue) => {
          this.props.movesMetadataTable.props = newValue[0];
          this.props.movesMetadataTable.mount();
          const startSettings = {
            movetext: this.props.movesMetadataTable.props.movetext
          };
          analysisWebSocket.send(`/start classical ${mode.ANALYSIS} "${JSON.stringify(startSettings).replace(/"/g, '\\"')}"`);
          this.props.modal.hide();
          this.props.progressModal.props.modal.hide();
        });
      } catch (error) {
      } finally {
      }
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
