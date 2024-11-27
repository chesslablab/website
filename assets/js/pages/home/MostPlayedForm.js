import { Chart, registerables } from 'https://cdn.jsdelivr.net/npm/chart.js@4.4.2/+esm';
import { blackAutocomplete } from '../BlackAutocomplete.js';
import { eventAutocomplete } from '../EventAutocomplete.js';
import movesMetadataTable from '../movesMetadataTable.js';
import { whiteAutocomplete } from '../WhiteAutocomplete.js';
import BaseComponent from '../../BaseComponent.js';
import { dataWebSocket } from '../../websockets/data/DataWebSocket.js';
import { analysisWebSocket } from '../../websockets/game/AnalysisWebSocket.js';
import * as mode from '../../../mode.js';
import * as variant from '../../../variant.js';

Chart.register(...registerables);

export class MostPlayedForm extends BaseComponent {
  _nBars = 25;

  mount() {
    const handleBarClick = async (event, clickedElements) => {
      if (clickedElements.length === 0) {
        return;
      }
      this.progressModal.props.modal.show();
      const formData = new FormData(this.el);
      const { dataIndex, raw } = clickedElements[0].element.$context;
      dataWebSocket
        .send('/search', {
          White: formData.get('White'),
          Black: formData.get('Black'),
          Event: formData.get('Event'),
          Result: formData.get('Result'),
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
          this.progressModal.props.modal.hide();
        });
    }

    this.el.addEventListener('submit', async (event) => {
      event.preventDefault();
      this.progressModal.props.modal.show();
      const formData = new FormData(this.el);
      const playerStatsChart = document.querySelector('#playerStatsChart');
      dataWebSocket
        .send('/opening', {
          White: formData.get('White'),
          Black: formData.get('Black'),
          Event: formData.get('Event'),
          Result: formData.get('Result')
        })
        .onChange('/opening', data => {
          const formData = new FormData(this.el);
          const canvas = document.createElement('canvas');
          canvas.height = 291;
          playerStatsChart.classList.add('mt-3');
          playerStatsChart.replaceChildren();
          playerStatsChart.appendChild(canvas);
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
                  },
                  ticks: {
                    precision: 0
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

export const mostPlayedForm = new MostPlayedForm({
  el: document.querySelector('#mostPlayedForm'),
  props() {
    return({
      movesMetadataTable: movesMetadataTable
    });
  }
});
