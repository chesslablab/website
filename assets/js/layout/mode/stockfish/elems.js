import {
  ws,
  playComputer
} from './init.js';
import * as env from '../../../../env.js';
import * as mode from '../../../../mode.js';
import * as variant from '../../../../variant.js';

playComputer.form.addEventListener('submit', event => {
  event.preventDefault();
  const formData = new FormData(playComputer.form);
  localStorage.clear();
  localStorage.setItem('mode', mode.STOCKFISH);
  if (formData.get('level') == 1) {
    localStorage.setItem('skillLevel', 11);
    localStorage.setItem('depth', 4);
  } else if (formData.get('level') == 2) {
    localStorage.setItem('skillLevel', 17);
    localStorage.setItem('depth', 8);
  } else if (formData.get('level') == 3) {
    localStorage.setItem('skillLevel', 20);
    localStorage.setItem('depth', 12);
  } else {
    localStorage.setItem('skillLevel', 6);
    localStorage.setItem('depth', 2);
  }
  ws.send(`/start ${variant.CLASSICAL} ${mode.STOCKFISH} ${formData.get('color')}`);
  playComputer.modal.hide();
});

gameStudyDropdown.children.item(0).addEventListener('click', async (event) => {
  event.preventDefault();
  await fetch(`${env.API_SCHEME}://${env.API_HOST}:${env.API_PORT}/${env.API_VERSION}/download/image`, {
    method: 'POST',
    headers: {
      'X-Api-Key': `${env.API_KEY}`
    },
    body: JSON.stringify({
      fen: ws.sanMovesTable.props.fen[ws.sanMovesTable.current],
      variant: variant.CLASSICAL,
      flip: ws.chessboard.getOrientation()
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
  });
});

gameStudyDropdown.children.item(1).addEventListener('click', async (event) => {
  event.preventDefault();
  await fetch(`${env.API_SCHEME}://${env.API_HOST}:${env.API_PORT}/${env.API_VERSION}/download/mp4`, {
    method: 'POST',
    headers: {
      'X-Api-Key': `${env.API_KEY}`
    },
    body: JSON.stringify({
      variant: ws.chessboard.props.variant,
      movetext: ws.sanMovesTable.props.movetext,
      flip: ws.chessboard.getOrientation(),
      ...(ws.chessboard.props.variant === variant.CHESS_960) && {startPos: ws.chessboard.props.startPos},
      ...(ws.chessboard.props.variant === variant.CAPABLANCA_FISCHER) && {startPos: ws.chessboard.props.startPos}
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
  });
});
