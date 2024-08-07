import Modal from 'bootstrap/js/dist/modal.js';
import { Chart, registerables } from 'https://cdn.jsdelivr.net/npm/chart.js@4.4.2/+esm';
import { blackAutocomplete } from '../../BlackAutocomplete.js';
import movesMetadataTable from '../../movesMetadataTable.js';
import { progressModal } from '../../ProgressModal.js';
import { whiteAutocomplete } from '../../WhiteAutocomplete.js';
import AbstractComponent from '../../../AbstractComponent.js';
import { dataWebSocket } from '../../../websockets/data/DataWebSocket.js';
import { analysisWebSocket } from '../../../websockets/game/AnalysisWebSocket.js';
import * as mode from '../../../../mode.js';

Chart.register(...registerables);

export class PlayerStatsModal extends AbstractComponent {
  _nBars = 25;

  mount() {
    const handleBarClick = async (event, clickedElements) => {
      try {
        if (clickedElements.length === 0) {
          return;
        }
        this.props.progressModal.props.modal.show();
        const formData = new FormData(this.props.form);
        const { dataIndex, raw } = clickedElements[0].element.$context;
        const searchSettings = {
          White: formData.get('White'),
          Black: formData.get('Black'),
          Result: formData.get('Result'),
          ECO: event.chart.data.labels[dataIndex]
        };
        await dataWebSocket.connect();
        dataWebSocket.send(`/search "${JSON.stringify(searchSettings).replace(/"/g, '\\"')}"`);
        dataWebSocket.watch('/search', (newValue, oldValue) => {
          this.props.movesMetadataTable.props = newValue[0];
          this.props.movesMetadataTable.mount();
          const startSettings = {
            movetext: this.props.movesMetadataTable.props.movetext
          };
          analysisWebSocket.send(`/start classical ${mode.ANALYSIS} "${JSON.stringify(startSettings).replace(/"/g, '\\"')}"`);
        });
      } catch (error) {
      } finally {
        this.props.modal.hide();
        this.props.progressModal.props.modal.hide();
      }
    }

    this.props.form.addEventListener('submit', async (event) => {
      try {
        event.preventDefault();
        this.props.progressModal.props.modal.show();
        const formData = new FormData(this.props.form);
        const playerStatsChart = document.getElementById('playerStatsChart');
        const settings = {
          White: formData.get('White'),
          Black: formData.get('Black'),
          Result: formData.get('Result')
        };
        await dataWebSocket.connect();
        dataWebSocket.send(`/stats_player "${JSON.stringify(settings).replace(/"/g, '\\"')}"`);
        dataWebSocket.watch('/stats_player', (newValue, oldValue) => {
          const canvas = document.createElement('canvas');
          playerStatsChart.replaceChildren();
          playerStatsChart.appendChild(canvas);
          const chart = new Chart(canvas, {
            type: 'bar',
            data: {
              labels: newValue.map(value => value.ECO).slice(0, this._nBars),
              datasets: [{
                data: newValue.map(value => value.total).slice(0, this._nBars),
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
        });
      } catch (error) {
      } finally {
        this.props.progressModal.props.modal.hide();
      }
    });
  }
}

export const playerStatsModal = new PlayerStatsModal(
  document.getElementById('playerStatsModal'),
  {
    modal: new Modal(document.getElementById('playerStatsModal')),
    form: document.querySelector('#playerStatsModal form'),
    movesMetadataTable: movesMetadataTable,
    progressModal: progressModal
  }
);
