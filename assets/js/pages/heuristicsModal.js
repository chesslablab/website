import { Chart, registerables } from 'https://cdn.jsdelivr.net/npm/chart.js@4.4.2/+esm';
import Modal from 'bootstrap/js/dist/modal.js';

Chart.register(...registerables);

const charts = document.getElementById('charts');

charts.classList.remove('d-none');

const heuristicsModal = {
  modal: new Modal(document.getElementById('heuristicsModal')),
  mount: (res) => {
    while (charts.firstChild) {
      charts.removeChild(charts.firstChild);
    }
    res.names.forEach((item, i) => {
      const div = document.createElement('div');
      const canvas = document.createElement('canvas');
      div.classList.add('col-md-4');
      div.appendChild(canvas);
      charts.appendChild(div);
      new Chart(canvas, {
        type: 'line',
        data: {
          labels: res.balance[i],
          datasets: [{
            label: item,
            data: res.balance[i],
            borderWidth: 2.25,
            tension: 0.25,
            borderColor: '#0a0a0a'
          }]
        },
        options: {
          animation: false,
          elements: {
            point:{
              radius: 0
            }
          },
          scales: {
            y: {
              ticks: {
                display: false
              },
              grid: {
                display: false
              },
              border: {
                display: false
              },
              beginAtZero: true,
              min: -1.1,
              max: 1.1
            },
            x: {
              ticks: {
                display: false
              },
              grid: {
                display: false
              },
              border: {
                display: false
              }
            }
          },
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                boxWidth: 0,
                font: {
                  size: 16
                }
              }
            }
          }
        }
      });
    });
  }
}

export default heuristicsModal;
