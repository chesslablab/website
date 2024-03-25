import { Chart, registerables } from 'https://cdn.jsdelivr.net/npm/chart.js@4.4.2/+esm';
import Modal from 'bootstrap/js/dist/modal.js';

Chart.register(...registerables);

const winRateForWhite = document.getElementById('winRateForWhiteChart');

const topOpeningsModal = {
  modal: new Modal(document.getElementById('topOpeningsModal')),
  form: document.querySelector('#topOpeningsModal form'),
  mount: (res) => {

    const ctx = document.getElementById('winRateForWhiteChart');

     new Chart(ctx, {
       type: 'bar',
       data: {
         labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
         datasets: [{
           label: '# of Votes',
           data: [12, 19, 3, 5, 2, 3],
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
