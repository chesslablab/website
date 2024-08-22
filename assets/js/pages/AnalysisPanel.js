import Modal from 'bootstrap/js/dist/modal.js';
import { Movetext, NOTATION_SAN } from '@chesslablab/js-utils';
import { Chart, registerables } from 'https://cdn.jsdelivr.net/npm/chart.js@4.4.2/+esm';
import boardActionsDropdown from './boardActionsDropdown.js';
import { gameActionsDropdown } from './GameActionsDropdown.js';
import historyButtons from './historyButtons.js';
import openingTable from './openingTable.js';
import sanMovesBrowser from './sanMovesBrowser.js';
import AbstractComponent from '../AbstractComponent.js';
import { binaryWebSocket } from '../websockets/binary/BinaryWebSocket.js';
import { analysisWebSocket } from '../websockets/game/AnalysisWebSocket.js';
import * as variant from '../../variant.js';

Chart.register(...registerables);

export class GameStudyDropdown extends AbstractComponent {
  mount() {
    // ...
  }
}

export class ExplainPositionModal extends AbstractComponent {
  mount() {
    const p = this.el.querySelector('p');
    p.replaceChildren();
    p.appendChild(document.createTextNode(this.props.explanation));
  }
}

export class HeuristicsModal extends AbstractComponent {
  mount() {
    // ...
  }
}

export class AnalysisPanel extends AbstractComponent {
  mount() {
    this.props.boardActionsDropdown.el.children.item(3).addEventListener('click', (event) => {
      event.preventDefault();
      const settings = {
        fen: this.props.sanMovesBrowser.props.fen[this.props.sanMovesBrowser.current],
        flip: this.props.sanMovesBrowser.props.chessboard.getOrientation()
      };
      binaryWebSocket.send(`/image "${JSON.stringify(settings).replace(/"/g, '\\"')}"`);
    });

    this.props.gameActionsDropdown.props.ul.children.item(0).addEventListener('click', (event) => {
      event.preventDefault();
      analysisWebSocket.send('/undo');
    });

    this.props.gameStudyDropdown.props.ul.children.item(0).addEventListener('click', async (event) => {
      event.preventDefault();
      this.progressModal.props.modal.show();
      const settings = {
        fen: this.props.sanMovesBrowser.props.fen[this.props.sanMovesBrowser.current]
      };
      analysisWebSocket.send(`/tutor_fen "${JSON.stringify(settings).replace(/"/g, '\\"')}"`);
      this.progressModal.props.modal.hide();
    });

    this.props.gameStudyDropdown.props.ul.children.item(1).addEventListener('click', async (event) => {
      event.preventDefault();
      this.progressModal.props.modal.show();
      const settings = {
        exclude: "Attack"
      };
      analysisWebSocket
        .send(`/eval_names "${JSON.stringify(settings).replace(/"/g, '\\"')}"`)
        .onChange('/eval_names', data => {
          const select = this.props.heuristicsModal.props.form.querySelector('select[name="heuristic"]');
          Object.values(data).forEach((item, i) => {
            const option = document.createElement('option');
            option.text = item;
            option.value = item;
            select.add(option, select[i]);
          });
          this.props.heuristicsModal.props.chart.replaceChildren();
          this.props.heuristicsModal.props.form.getElementsByTagName('select')[0].value = '';
          this.props.heuristicsModal.props.modal.show();
          this.progressModal.props.modal.hide();
        });
    });

    this.props.heuristicsModal.props.form.querySelector('select[name="heuristic"]').addEventListener('change', async (event) => {
      event.preventDefault();
      this.progressModal.props.modal.show();
      const back = (this.props.sanMovesBrowser.props.fen.length - this.props.sanMovesBrowser.current - 1) * -1;
      const settings = {
        variant: variant.CLASSICAL,
        movetext: Movetext.notation(NOTATION_SAN, Movetext.substring(this.props.sanMovesBrowser.props.movetext, back)),
        name: event.target.value
      };
      analysisWebSocket
        .send(`/heuristic "${JSON.stringify(settings).replace(/"/g, '\\"')}"`)
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
          this.progressModal.props.modal.hide();
        });
    });
  }
}

export const analysisPanel = new AnalysisPanel(
  document.getElementById('sanPanel'),
  {
    boardActionsDropdown: boardActionsDropdown,
    gameActionsDropdown: gameActionsDropdown,
    gameStudyDropdown: new GameStudyDropdown(
      document.getElementById('gameStudyDropdown'),
      {
        ul: document.querySelector('#gameStudyDropdown ul')
      }
    ),
    explainPositionModal: new ExplainPositionModal(
      document.getElementById('explainPositionModal'),
      {
        modal: new Modal(document.getElementById('explainPositionModal')),
        explanation: ''
      }
    ),
    heuristicsModal: new HeuristicsModal(
      document.getElementById('heuristicsModal'),
      {
        modal: new Modal(document.getElementById('heuristicsModal')),
        form: document.querySelector('#heuristicsModal form'),
        chart: document.getElementById('chart')
      }
    ),
    historyButtons: historyButtons,
    openingTable: openingTable,
    sanMovesBrowser: sanMovesBrowser
  }
);
