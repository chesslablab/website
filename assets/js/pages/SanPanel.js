import { Movetext, NOTATION_SAN } from '@chesslablab/js-utils';
import { Chart, registerables } from 'https://cdn.jsdelivr.net/npm/chart.js@4.4.2/+esm';
import boardActionsDropdown from './boardActionsDropdown.js';
import chessboard from './chessboard.js';
import { explainPositionModal } from './ExplainPositionModal.js';
import { gameActionsDropdown } from './GameActionsDropdown.js';
import { gameStudyDropdown } from './GameStudyDropdown.js';
import { heuristicsModal } from './HeuristicsModal.js';
import historyButtons from './historyButtons.js';
import openingTable from './openingTable.js';
import sanMovesBrowser from './sanMovesBrowser.js';
import AbstractComponent from '../AbstractComponent.js';
import { analysisWebSocket } from '../websockets/game/AnalysisWebSocket.js';
import * as variant from '../../variant.js';

Chart.register(...registerables);

export class SanPanel extends AbstractComponent {
  mount() {
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
        name: event.target.value,
        ...(this.props.chessboard.props.variant === variant.CHESS_960) && {startPos: this.props.chessboard.props.variant}
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

export const sanPanel = new SanPanel(
  document.getElementById('sanPanel'),
  {
    chessboard: chessboard,
    boardActionsDropdown: boardActionsDropdown,
    gameActionsDropdown: gameActionsDropdown,
    gameStudyDropdown: gameStudyDropdown,
    explainPositionModal: explainPositionModal,
    heuristicsModal: heuristicsModal,
    historyButtons: historyButtons,
    openingTable: openingTable,
    sanMovesBrowser: sanMovesBrowser
  }
);
