import Modal from 'bootstrap/js/dist/modal.js';
import { Chart, registerables } from 'https://cdn.jsdelivr.net/npm/chart.js@4.4.2/+esm';
import { eventAutocomplete } from '../../EventAutocomplete.js';
import movesMetadataTable from '../../movesMetadataTable.js';
import AbstractComponent from '../../../AbstractComponent.js';
import { analysisWebSocket } from '../../../websockets/game/AnalysisWebSocket.js';
import { dataWebSocket } from '../../../websockets/data/DataWebSocket.js';
import * as mode from '../../../../mode.js';

Chart.register(...registerables);

export class ResultEventModal extends AbstractComponent {
  _nBars = 25;

  mount() {
    const handleBarClick = async (event, clickedElements) => {
      if (clickedElements.length === 0) {
        return;
      }
      this.progressModal.props.modal.show();
      const formData = new FormData(this.props.form);
      const { dataIndex, raw } = clickedElements[0].element.$context;
      const searchSettings = {
        Event: formData.get('Event'),
        Result: formData.get('Result'),
        ECO: event.chart.data.labels[dataIndex]
      };
      dataWebSocket
        .send(`/search "${JSON.stringify(searchSettings).replace(/"/g, '\\"')}"`)
        .onChange('/search', data => {
          this.props.movesMetadataTable.props = data[0];
          this.props.movesMetadataTable.mount();
          const startSettings = {
            movetext: this.props.movesMetadataTable.props.movetext
          };
          analysisWebSocket.send(`/start classical ${mode.ANALYSIS} "${JSON.stringify(startSettings).replace(/"/g, '\\"')}"`);
          this.props.modal.hide();
          this.progressModal.props.modal.hide();
        });
    }

    this.props.form.addEventListener('submit', async (event) => {
      event.preventDefault();
      this.progressModal.props.modal.show();
      const formData = new FormData(this.props.form);
      const eventStatsChart = document.getElementById('eventStatsChart');
      const settings = {
        Event: formData.get('Event'),
        Result: formData.get('Result')
      };
      dataWebSocket
        .send(`/result_event "${JSON.stringify(settings).replace(/"/g, '\\"')}"`)
        .onChange('/result_event', data => {
          const canvas = document.createElement('canvas');
          eventStatsChart.replaceChildren();
          eventStatsChart.appendChild(canvas);
          const chart = new Chart(canvas, {
            type: 'bar',
            data: {
              labels: data.map(value => value.ECO).slice(0, this._nBars),
              datasets: [{
                data: data.map(value => value.total).slice(0, this._nBars),
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
          this.progressModal.props.modal.hide();
        });
    });
  }
}

export const resultEventModal = new ResultEventModal(
  document.getElementById('resultEventModal'),
  {
    modal: new Modal(document.getElementById('resultEventModal')),
    form: document.querySelector('#resultEventModal form'),
    movesMetadataTable: movesMetadataTable
  }
);
