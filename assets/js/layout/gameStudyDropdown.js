import { Chart, registerables } from 'https://cdn.jsdelivr.net/npm/chart.js@4.4.2/+esm';
import { Movetext } from '@chesslablab/jsblab';
import chessboard from './chessboard.js';
import heuristicsModal from './heuristicsModal.js';
import progressModal from './progressModal.js';
import sanMovesTable from './sanMovesTable.js';
import * as env from '../../env.js';
import * as variant from '../../variant.js';

Chart.register(...registerables);

const gameStudyDropdown = document.querySelector('#gameStudyDropdown ul');

gameStudyDropdown.children.item(0).addEventListener('click', async (event) => {
  event.preventDefault();
  progressModal.modal.show();
  await fetch(`${env.API_SCHEME}://${env.API_HOST}:${env.API_PORT}/${env.API_VERSION}/download/image`, {
    method: 'POST',
    headers: {
      'X-Api-Key': `${env.API_KEY}`
    },
    body: JSON.stringify({
      fen: sanMovesTable.props.fen[sanMovesTable.current],
      variant: variant.CLASSICAL,
      flip: chessboard.getOrientation()
    })
  })
  .then(res => res.blob())
  .then(blob => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = "chessboard.png";
    document.body.appendChild(a);
    a.click();
    a.remove();
  })
  .catch(error => {
    // TODO
  })
  .finally(() => {
    progressModal.modal.hide();
  });
});

gameStudyDropdown.children.item(1).addEventListener('click', async (event) => {
  event.preventDefault();
  progressModal.modal.show();
  await fetch(`${env.API_SCHEME}://${env.API_HOST}:${env.API_PORT}/${env.API_VERSION}/download/mp4`, {
    method: 'POST',
    headers: {
      'X-Api-Key': `${env.API_KEY}`
    },
    body: JSON.stringify({
      variant: chessboard.props.variant,
      movetext: sanMovesTable.props.movetext,
      flip: chessboard.getOrientation(),
      ...(chessboard.props.variant === variant.CHESS_960) && {startPos: chessboard.props.startPos},
      ...(chessboard.props.variant === variant.CAPABLANCA_FISCHER) && {startPos: chessboard.props.startPos}
    })
  })
  .then(res => res.blob())
  .then(blob => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = "chessgame.mp4";
    document.body.appendChild(a);
    a.click();
    a.remove();
  })
  .catch(error => {
    // TODO
  })
  .finally(() => {
    progressModal.modal.hide();
  });
});

gameStudyDropdown.children.item(2).addEventListener('click', async (event) => {
  event.preventDefault();
  progressModal.modal.show();
  await fetch(`${env.API_SCHEME}://${env.API_HOST}:${env.API_PORT}/${env.API_VERSION}/heuristics`, {
    method: 'POST',
    headers: {
      'X-Api-Key': `${env.API_KEY}`
    },
    body: JSON.stringify({
      variant: variant.CLASSICAL,
      movetext: sanMovesTable.props.movetext,
      ...(chessboard.props.variant === variant.CHESS_960) && {startPos: chessboard.props.startPos}
    })
  })
  .then(res => res.json())
  .then(res => {
    const charts = document.getElementById('charts');
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
  })
  .catch(error => {
    // TODO
  })
  .finally(() => {
    progressModal.modal.hide();
    heuristicsModal.modal.show();
  });
});

export default gameStudyDropdown;
