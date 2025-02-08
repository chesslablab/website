import Modal from 'bootstrap/js/dist/modal.js';
import { HistoryButtons, OpeningTable, Movetext, NOTATION_SAN } from '@chesslablab/js-utils';
import { Chart, registerables } from 'https://cdn.jsdelivr.net/npm/chart.js@4.4.2/+esm';
import MyBoardActionsDropdown from './MyBoardActionsDropdown.js';
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

export class ExplainGoodPgnModal extends BaseComponent {
  mount() {
    const p = this.el.querySelector('p');
    p.replaceChildren();
    p.appendChild(document.createTextNode(`${this.props.pgn} is a good move now. ${this.props.explanation}`));
  }
}

export class AnalysisPanel extends BaseComponent {
  plot(event, data) {
    return {
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
            beginAtZero: true
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
          this.props.steinitzModal.props.modal.hide();
        }
      }
    };
  }

  mount() {
    this.props.gameActionsDropdown.props.ul.children.item(0).addEventListener('click', (event) => {
      event.preventDefault();
      analysisWebSocket.send('/undo');
    });

    this.props.gameStudyDropdown.props.ul.children.item(0).addEventListener('click', async (event) => {
      event.preventDefault();
      analysisWebSocket
        .send('/tutor_fen', {
          fen: this.props.movesBrowser.props.fen[this.props.movesBrowser.current]
        })
        .onChange('/tutor_fen', data => {
          this.props.explainPositionModal.props.explanation = data;
          this.props.explainPositionModal.mount();
          this.props.explainPositionModal.props.modal.show();
        });
    });

    this.props.gameStudyDropdown.props.ul.children.item(1).addEventListener('click', async (event) => {
      event.preventDefault();
      this.progressModal.props.modal.show();
      analysisWebSocket
        .send('/tutor_good_pgn')
        .onChange('/tutor_good_pgn', data => {
          this.props.explainGoodPgnModal.props.pgn = data.pgn;
          this.props.explainGoodPgnModal.props.explanation = data.paragraph;
          this.props.explainGoodPgnModal.mount();
          this.props.explainGoodPgnModal.props.modal.show();
          this.progressModal.props.modal.hide();
        });
    });

    this.props.gameStudyDropdown.props.ul.children.item(2).addEventListener('click', async (event) => {
      event.preventDefault();
      analysisWebSocket
        .send('/eval_names')
        .onChange('/eval_names', data => {
          const select = this.props.heuristicsModal.props.form.querySelector('select[name="heuristic"]');
          Array.from(select.children).forEach(item => {
            if (item.value !== '') {
              select.remove(item);
            }
          });
          Object.values(data).forEach((item, i) => {
            const option = document.createElement('option');
            option.text = item;
            option.value = item;
            select.add(option, select[i]);
          });
          select.value = '';
          this.props.heuristicsModal.props.chart.replaceChildren();
          this.props.heuristicsModal.props.modal.show();
        });
    });

    this.props.gameStudyDropdown.props.ul.children.item(3).addEventListener('click', async (event) => {
      event.preventDefault();
      this.progressModal.props.modal.show();
      const back = (this.props.movesBrowser.props.fen.length - this.props.movesBrowser.current - 1) * -1;
      analysisWebSocket
        .send('/extract', {
          variant: variant.CLASSICAL,
          movetext: Movetext.notation(NOTATION_SAN, Movetext.substring(this.props.movesBrowser.props.movetext, back))
        })
        .onChange('/extract', data => {
          const canvas = document.createElement('canvas');
          this.props.steinitzModal.props.chart.replaceChildren();
          this.props.steinitzModal.props.chart.appendChild(canvas);
          new Chart(canvas, this.plot(event, data));
          this.props.steinitzModal.props.modal.show();
          this.progressModal.props.modal.hide();
        });
    });

    this.props.heuristicsModal.props.form.querySelector('select[name="heuristic"]').addEventListener('change', async (event) => {
      if (event.target.value) {
        this.progressModal.props.modal.show();
        const back = (this.props.movesBrowser.props.fen.length - this.props.movesBrowser.current - 1) * -1;
        analysisWebSocket
          .send('/plot', {
            variant: variant.CLASSICAL,
            movetext: Movetext.notation(NOTATION_SAN, Movetext.substring(this.props.movesBrowser.props.movetext, back)),
            name: event.target.value
          })
          .onChange('/plot', data => {
            const canvas = document.createElement('canvas');
            this.props.heuristicsModal.props.chart.replaceChildren();
            this.props.heuristicsModal.props.chart.appendChild(canvas);
            new Chart(canvas, this.plot(event, data));
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
      boardActionsDropdown: new MyBoardActionsDropdown({
        el: document.querySelector('#boardActionsDropdown ul'),
        props() {
          return({
            movesBrowser: sanMovesBrowser
          });
        }
      }),
      gameActionsDropdown: new BaseComponent({
        el: document.querySelector('#gameActionsDropdown'),
        props() {
          return({
            ul: this.el.querySelector('ul')
          });
        }
      }),
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
      explainGoodPgnModal: new ExplainGoodPgnModal({
        el: document.querySelector('#explainGoodPgnModal'),
        props() {
          return({
            modal: new Modal(this.el),
            pgn: '',
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
      steinitzModal: new BaseComponent({
        el: document.querySelector('#steinitzModal'),
        props() {
          return({
            modal: new Modal(this.el),
            chart: this.el.querySelector('#chart')
          });
        }
      }),
      historyButtons: new HistoryButtons({
        el: document.querySelector('#historyButtons'),
        props() {
          return({
            movesBrowser: sanMovesBrowser
          });
        }
      }),
      openingTable: new OpeningTable({
        el: document.querySelector('#openingTable tbody'),
        props() {
          return({
            movetext: sanMovesBrowser.props.movetext
          });
        }
      }),
      movesBrowser: sanMovesBrowser
    });
  }
});
