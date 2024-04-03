import { Chart, registerables } from 'https://cdn.jsdelivr.net/npm/chart.js@4.4.2/+esm';
import AbstractComponent from './AbstractComponent.js';

Chart.register(...registerables);

class HeuristicsModal extends AbstractComponent {
  mount() {
    this.props.charts.classList.remove('d-none');

    while (this.props.charts.firstChild) {
      this.props.charts.removeChild(this.props.charts.firstChild);
    }

    this.props.heuristics.names?.forEach((item, i) => {
      const div = document.createElement('div');
      const canvas = document.createElement('canvas');
      div.classList.add('col-md-4');
      div.appendChild(canvas);
      this.props.charts.appendChild(div);
      new Chart(canvas, {
        type: 'line',
        data: {
          labels: this.props.heuristics.balance[i],
          datasets: [{
            label: item,
            data: this.props.heuristics.balance[i],
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

export default HeuristicsModal;
