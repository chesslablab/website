import Modal from 'bootstrap/js/dist/modal.js';
import { Chart, registerables } from 'https://cdn.jsdelivr.net/npm/chart.js@4.4.2/+esm';
import { eventAutocomplete } from '../../EventAutocomplete.js';
import movesMetadataTable from '../../movesMetadataTable.js';
import { progressModal } from '../../ProgressModal.js';
import AbstractComponent from '../../../AbstractComponent.js';
import { sanWebSocket } from '../../../SanWebSocket.js';
import * as env from '../../../../env.js';
import * as mode from '../../../../mode.js';

Chart.register(...registerables);

export class EventStatsModal extends AbstractComponent {
  _nBars = 25;

  mount() {
    const handleBarClick = async (event, clickedElements) => {
      const formData = new FormData(this.props.form);
      this.props.progressModal.props.modal.show();
      if (clickedElements.length === 0) {
        return;
      }
      const { dataIndex, raw } = clickedElements[0].element.$context;
      try {
        const res = await fetch(`${env.API_SCHEME}://${env.API_HOST}:${env.API_PORT}/${env.API_VERSION}/search`, {
          method: 'POST',
          headers: {
            'X-Api-Key': `${env.API_KEY}`
          },
          body: JSON.stringify({
            Event: formData.get('Event'),
            Result: formData.get('Result'),
            ECO: event.chart.data.labels[dataIndex]
          })
        });
        const data = await res.json();
        this.props.movesMetadataTable.props = data[0];
        this.props.movesMetadataTable.mount();
        const add = {
          movetext: data[0].movetext
        };
        sanWebSocket.send(`/start classical ${mode.SAN} "${JSON.stringify(add).replace(/"/g, '\\"')}"`);
      } catch (error) {
      }
      this.props.modal.hide();
      this.props.progressModal.props.modal.hide();
    }

    this.props.form.addEventListener('submit', async (event) => {
      event.preventDefault();
      this.props.progressModal.props.modal.show();
      const formData = new FormData(this.props.form);
      const eventStatsChart = document.getElementById('eventStatsChart');
      try {
        const res = await fetch(`${env.API_SCHEME}://${env.API_HOST}:${env.API_PORT}/${env.API_VERSION}/stats/event`, {
          method: 'POST',
          headers: {
            'X-Api-Key': `${env.API_KEY}`
          },
          body: JSON.stringify({
            Event: formData.get('Event'),
            Result: formData.get('Result')
          })
        });
        const data = await res.json();
        while (eventStatsChart.firstChild) {
          eventStatsChart.removeChild(eventStatsChart.firstChild);
        }
        const canvas = document.createElement('canvas');
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
      } catch (error) {
        // TODO
      }
      this.props.progressModal.props.modal.hide();
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
