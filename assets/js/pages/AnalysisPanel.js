import Modal from 'bootstrap/js/dist/modal.js';
import { Movetext, NOTATION_SAN } from '@chesslablab/js-utils';
import { Chart, registerables } from 'https://cdn.jsdelivr.net/npm/chart.js@4.4.2/+esm';
import { gameActionsDropdown } from './GameActionsDropdown.js';
import historyButtons from './historyButtons.js';
import MyBoardActionsDropdown from './MyBoardActionsDropdown.js';
import openingTable from './openingTable.js';
import sanMovesBrowser from './sanMovesBrowser.js';
import BaseComponent from '../BaseComponent.js';
import { analysisWebSocket } from '../websockets/game/AnalysisWebSocket.js';
import * as variant from '../../variant.js';

Chart.register(...registerables);

export class ExplainPositionModal extends BaseComponent {
  mount() {
    const p = this.el.querySelector('p');
    p.replaceChildren();
    p.appendChild(document.createTextNode(this.props.explanation));
  }
}

export class AnalysisPanel extends BaseComponent {
  mount() {
    this.props.gameActionsDropdown.props.ul.children.item(0).addEventListener('click', (event) => {
      event.preventDefault();
      analysisWebSocket.send('/undo');
    });

    this.props.gameStudyDropdown.props.ul.children.item(0).addEventListener('click', async (event) => {
      event.preventDefault();
      this.progressModal.props.modal.show();
      analysisWebSocket
        .send('/tutor_fen', {
          fen: this.props.movesBrowser.props.fen[this.props.movesBrowser.current]
        })
        .onChange('/tutor_fen', data => {
          this.props.explainPositionModal.props.explanation = data;
          this.props.explainPositionModal.mount();
          this.props.explainPositionModal.props.modal.show();
          this.progressModal.props.modal.hide();
        });
    });

    this.props.gameStudyDropdown.props.ul.children.item(1).addEventListener('click', async (event) => {
      event.preventDefault();
      this.progressModal.props.modal.show();
      analysisWebSocket
        .send('/eval_names')
        .onChange('/eval_names', data => {
          const select = this.props.heuristicsModal.props.form.querySelector('select[name="heuristic"]');
          select.value = '';
          Object.values(data).forEach((item, i) => {
            const option = document.createElement('option');
            option.text = item;
            option.value = item;
            select.add(option, select[i]);
          });
          this.props.heuristicsModal.props.chart.replaceChildren();
          this.props.heuristicsModal.props.modal.show();
          this.progressModal.props.modal.hide();
        });
    });

    this.props.heuristicsModal.props.form.querySelector('select[name="heuristic"]').addEventListener('change', async (event) => {
      event.preventDefault();
      if (event.target.value) {
        this.progressModal.props.modal.show();
        const back = (this.props.movesBrowser.props.fen.length - this.props.movesBrowser.current - 1) * -1;
        analysisWebSocket
          .send('/heuristic', {
            variant: variant.CLASSICAL,
            movetext: Movetext.notation(NOTATION_SAN, Movetext.substring(this.props.movesBrowser.props.movetext, back)),
            name: event.target.value
          })
          .onChange('/heuristic', data => {
            const canvas = document.createElement('canvas');
            this.props.heuristicsModal.props.chart.replaceChildren();
            this.props.heuristicsModal.props.chart.appendChild(canvas);
            new Chart(canvas, {
              type: 'line',
              data: {
                labels: data,
                datasets: [{
                  label: event.target.value,
                  data: data,
                  borderColor: '#0d6efd'
                }]
              },
              options: {
                animation: false,
                responsive: true,
                elements: {
                  point: {
                    radius: 3,
                    hoverRadius: 6
                  }
                },
                plugins: {
                  legend: {
                    display: false
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
                    }
                  }
                },
                onClick: async (event, clickedElements) => {
                  if (clickedElements.length === 0) {
                    return;
                  }
                  const { dataIndex, raw } = clickedElements[0].element.$context;
                  this.props.movesBrowser.current = dataIndex;
                  this.props.movesBrowser.mount();
                  analysisWebSocket.chessboard.setPosition(this.props.movesBrowser.props.fen[dataIndex], true);
                  this.props.heuristicsModal.props.modal.hide();
                }
              }
            });
            this.progressModal.props.modal.hide();
          });
      }
    });
  }
}

export const analysisPanel = new AnalysisPanel({
  el: document.querySelector('#sanPanel'),
  props() {
    return({
      boardActionsDropdown: new MyBoardActionsDropdown(
        document.querySelector('#boardActionsDropdown ul'),
        {
          movesBrowser: sanMovesBrowser
        }
      ),
      gameActionsDropdown: gameActionsDropdown,
      gameStudyDropdown: new BaseComponent({
        el: document.querySelector('#gameStudyDropdown'),
        props() {
          return({
            ul: this.el.querySelector('ul')
          });
        }
      }),
      explainPositionModal: new ExplainPositionModal({
        el: document.querySelector('#explainPositionModal'),
        props() {
          return({
            modal: new Modal(this.el),
            explanation: ''
          });
        }
      }),
      heuristicsModal: new BaseComponent({
        el: document.querySelector('#heuristicsModal'),
        props() {
          return({
            modal: new Modal(this.el),
            form: this.el.querySelector('form'),
            chart: this.el.querySelector('#chart')
          });
        }
      }),
      historyButtons: historyButtons,
      openingTable: openingTable,
      movesBrowser: sanMovesBrowser
    });
  }
});
