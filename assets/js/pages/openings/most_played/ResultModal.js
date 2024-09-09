import Modal from 'bootstrap/js/dist/modal.js';
import { Chart, registerables } from 'https://cdn.jsdelivr.net/npm/chart.js@4.4.2/+esm';
import { dataWebSocket } from '../../../websockets/data/DataWebSocket.js';
import movesMetadataTable from '../../movesMetadataTable.js';
import AbstractComponent from '../../../AbstractComponent.js';
import { analysisWebSocket } from '../../../websockets/game/AnalysisWebSocket.js';
import * as mode from '../../../../mode.js';
import * as variant from '../../../../variant.js';

Chart.register(...registerables);

export class ResultModal extends AbstractComponent {
  _nBars = 25;

  mount() {
    const options = {
      animation: false,
      categoryPercentage: 1.0,
      barPercentage: 1.0,
      onHover: function(event, el) {
        event.native.target.style.cursor = el[0] ? 'pointer' : 'default';
      },
      onClick: async (event, clickedElements) => {
        if (clickedElements.length === 0) {
          return;
        }
        this.progressModal.props.modal.show();
        const { dataIndex, raw } = clickedElements[0].element.$context;
        dataWebSocket
          .send('/search', {
            Result: event.chart.data.datasets[0].label,
            ECO: event.chart.data.labels[dataIndex]
          })
          .onChange('/search', data => {
            this.props.movesMetadataTable.props = data[0];
            this.props.movesMetadataTable.mount();
            analysisWebSocket.send('/start', {
              variant: variant.CLASSICAL,
              mode: mode.ANALYSIS,
              settings: {
                movetext: this.props.movesMetadataTable.props.movetext
              }
            });
            this.props.modal.hide();
            this.progressModal.props.modal.hide();
          });
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

    if (this.props.result?.winRateForWhite) {
      new Chart(document.getElementById('winRateForWhiteChart'), {
        type: 'bar',
        data: {
          labels: this.props.result.winRateForWhite.map(value => value.ECO).slice(0, this._nBars),
          datasets: [{
            label: '1-0',
            data: this.props.result.winRateForWhite.map(value => value.total).slice(0, this._nBars),
            backgroundColor: '#c0c0c0'
          }]
        },
        options: options
      });
    }

    if (this.props.result?.drawRate) {
      new Chart(document.getElementById('drawRateChart'), {
        type: 'bar',
        data: {
          labels: this.props.result.drawRate.map(value => value.ECO).slice(0, this._nBars),
          datasets: [{
            label: '1/2-1/2',
            data: this.props.result.drawRate.map(value => value.total).slice(0, this._nBars),
            backgroundColor: '#888888'
          }]
        },
        options: options
      });
    }

    if (this.props.result?.winRateForBlack) {
      new Chart(document.getElementById('winRateForBlackChart'), {
        type: 'bar',
        data: {
          labels: this.props.result.winRateForBlack.map(value => value.ECO).slice(0, this._nBars),
          datasets: [{
            label: '0-1',
            data: this.props.result.winRateForBlack.map(value => value.total).slice(0, this._nBars),
            backgroundColor: '#404040'
          }]
        },
        options: options
      });
    }
  }
}

export const resultModal = new ResultModal(
  document.getElementById('resultModal'),
  {
    modal: new Modal(document.getElementById('resultModal')),
    form: document.querySelector('#resultModal form'),
    movesMetadataTable: movesMetadataTable,
    result: {}
  }
);
