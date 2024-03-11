import * as variant from '../../variant.js';

export const gameStudyDropdown = {
  elem: document.querySelector('#gameStudyDropdown ul'),
  domElem: (env, ws) => {
    document.querySelector('#gameStudyDropdown ul').children.item(0).addEventListener('click', async (event) => {
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

    document.querySelector('#gameStudyDropdown ul').children.item(1).addEventListener('click', async (event) => {
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
  }
}
