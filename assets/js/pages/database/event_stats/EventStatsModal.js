import Modal from 'bootstrap/js/dist/modal.js';
import { Chart, registerables } from 'https://cdn.jsdelivr.net/npm/chart.js@4.4.2/+esm';
import { eventAutocomplete } from '../../EventAutocomplete.js';
import movesMetadataTable from '../../movesMetadataTable.js';
import { progressModal } from '../../ProgressModal.js';
import AbstractComponent from '../../../AbstractComponent.js';
import { analysisWebSocket } from '../../../websockets/game/AnalysisWebSocket.js';
import { dataWebSocket } from '../../../websockets/data/DataWebSocket.js';
import * as mode from '../../../../mode.js';

Chart.register(...registerables);

export class EventStatsModal extends AbstractComponent {
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
          Event: formData.get('Event'),
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
        const eventStatsChart = document.getElementById('eventStatsChart');
        const settings = {
          Event: formData.get('Event'),
          Result: formData.get('Result')
        };
        await dataWebSocket.connect();
        dataWebSocket.send(`/stats_event "${JSON.stringify(settings).replace(/"/g, '\\"')}"`);
        dataWebSocket.watch('/stats_event', (newValue, oldValue) => {
          const canvas = document.createElement('canvas');
          eventStatsChart.replaceChildren();
          eventStatsChart.appendChild(canvas);
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

export const eventStatsModal = new EventStatsModal(
  document.getElementById('eventStatsModal'),
  {
    modal: new Modal(document.getElementById('eventStatsModal')),
    form: document.querySelector('#eventStatsModal form'),
    movesMetadataTable: movesMetadataTable,
    progressModal: progressModal
  }
);
