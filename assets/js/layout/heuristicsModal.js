import { Chart, registerables } from 'https://cdn.jsdelivr.net/npm/chart.js@4.4.2/+esm';
import Modal from 'bootstrap/js/dist/modal.js';

Chart.register(...registerables);

const charts = document.getElementById('charts');

const heuristicsModal = {
  modal: new Modal(document.getElementById('heuristicsModal')),
  form: document.querySelector('#heuristicsModal form'),
  mount: (res) => {
    while (charts.firstChild) {
      charts.removeChild(charts.firstChild);
    }
    res.names.forEach((item, i) => {
      const data = res.balance.map((value, index) => value[i]);
      const allEqual = arr => arr.every(val => val === arr[0]);
      if (!allEqual(data)) {
        const div = document.createElement('div');
        const canvas = document.createElement('canvas');
        div.appendChild(canvas);
        charts.appendChild(div);
        new Chart(canvas, {
          type: 'line',
          data: {
            labels: data,
            datasets: [{
              label: item,
              data: data,
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
      }
    });
  }
}

heuristicsModal.form.addEventListener('submit', event => {
  event.preventDefault();
  heuristicsModal.modal.hide();
});

export default heuristicsModal;
