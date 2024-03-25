import { Chart, registerables } from 'https://cdn.jsdelivr.net/npm/chart.js@4.4.2/+esm';
import Modal from 'bootstrap/js/dist/modal.js';

Chart.register(...registerables);

const topOpeningsModal = {
  modal: new Modal(document.getElementById('topOpeningsModal')),
  form: document.querySelector('#topOpeningsModal form'),
  mount: (res) => {
    const winRateForWhiteChart = document.getElementById('winRateForWhiteChart');

    new Chart(winRateForWhiteChart, {
      type: 'bar',
      data: {
        labels: res.winRateForWhite.map(value => value.ECO),
        datasets: [{
          label: 'Win Rate for White',
          data: res.winRateForWhite.map(value => value.total),
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    const drawRateChart = document.getElementById('drawRateChart');

    new Chart(drawRateChart, {
      type: 'bar',
      data: {
        labels: res.drawRate.map(value => value.ECO),
        datasets: [{
          label: 'Draw Rate',
          data: res.drawRate.map(value => value.total),
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}

topOpeningsModal.form.addEventListener('submit', event => {
  event.preventDefault();
  topOpeningsModal.modal.hide();
});

export default topOpeningsModal;
