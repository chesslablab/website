import { Movetext, NOTATION_SAN } from '@chesslablab/js-utils';
import { Chart, registerables } from 'https://cdn.jsdelivr.net/npm/chart.js@4.4.2/+esm';
import Modal from 'bootstrap/js/dist/modal.js';
import chessboard from './chessboard.js';
import { progressModal } from './ProgressModal.js';
import sanMovesBrowser from './sanMovesBrowser.js';
import AbstractComponent from '../AbstractComponent.js';
import * as connect from '../../connect.js';
import * as env from '../../env.js';
import * as variant from '../../variant.js';

Chart.register(...registerables);

export class HeuristicsModal extends AbstractComponent {
  async mount() {
    try {
      this.props.progressModal.props.modal.show();
      const res = await fetch(`${connect.api()}/eval/names`, {
        method: 'POST',
        // exclude time-consuming heuristics
        body: JSON.stringify({
          function: 'Standard',
          exclude: "Attack, Checkmate in one"
        })
      });
      const select = this.props.form.querySelector('select[name="heuristic"]');
      Object.values(await res.json()).forEach((item, i) => {
        const option = document.createElement('option');
        option.text = item;
        option.value = item;
        select.add(option, select[i]);
      });
    } catch (error) {
    } finally {
      this.props.progressModal.props.modal.hide();
    }

    this.props.form.getElementsByTagName('select')[0].addEventListener('change', async (event) => {
      try {
        event.preventDefault();
        this.props.progressModal.props.modal.show();
        const back = (this.props.sanMovesBrowser.props.fen.length - this.props.sanMovesBrowser.current - 1) * -1;
        const res = await fetch(`${connect.api()}/heuristic`, {
          method: 'POST',
          body: JSON.stringify({
            variant: variant.CLASSICAL,
            movetext: Movetext.notation(NOTATION_SAN, Movetext.substring(this.props.sanMovesBrowser.props.movetext, back)),
            name: event.target.value,
            ...(this.props.chessboard.props.variant === variant.CHESS_960) && {startPos: this.props.chessboard.props.startPos}
          })
        });
        const data = await res.json();
        const canvas = document.createElement('canvas');
        this.props.chart.replaceChildren();
        this.props.chart.appendChild(canvas);
        new Chart(canvas, {
          type: 'line',
          data: {
            labels: data,
            datasets: [{
              label: event.target.value,
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
      } catch (error) {
      } finally {
        this.props.progressModal.props.modal.hide();
      }
    });
  }
}

export const heuristicsModal = new HeuristicsModal(
  document.getElementById('heuristicsModal'),
  {
    modal: new Modal(document.getElementById('heuristicsModal')),
    form: document.querySelector('#heuristicsModal form'),
    chart: document.getElementById('chart'),
    chessboard: chessboard,
    sanMovesBrowser: sanMovesBrowser,
    progressModal: progressModal
  }
);
