import { databaseAnnotatedGames } from './DatabaseAnnotatedGames.js';
import { ravPanel } from './RavPanel.js';
import chessboard from '../../chessboard.js';
import { progressModal } from '../../ProgressModal.js';
import * as env from '../../../../env.js';
import * as variant from '../../../../variant.js';

progressModal.props.modal.show();

const handleClick = (game) => {
  progressModal.props.modal.show();
  fetch(`${env.API_SCHEME}://${env.API_HOST}:${env.API_PORT}/${env.API_VERSION}/play/rav`, {
    method: 'POST',
    headers: {
      'X-Api-Key': `${env.API_KEY}`
    },
    body: JSON.stringify({
      variant: variant.CLASSICAL,
      movetext: game.movetext,
    })
  })
  .then(res => res.json())
  .then(res => {
    ravPanel.props.ravMovesBrowser.current = res.fen.length - 1;
    ravPanel.props.ravMovesBrowser.props.chessboard.setPosition(res.fen[res.fen.length - 1]);
    ravPanel.props.ravMovesBrowser.props = {
      ...ravPanel.props.ravMovesBrowser.props,
      filtered: res.filtered,
      breakdown: res.breakdown,
      fen: res.fen
    };
    ravPanel.props.ravMovesBrowser.mount();
  })
  .catch(error => {
    // TODO
  })
  .finally(() => {
    progressModal.props.modal.hide();
  });
};

await fetch(`${env.API_SCHEME}://${env.API_HOST}:${env.API_PORT}/${env.API_VERSION}/annotations/games`, {
  method: 'GET',
  headers: {
    'X-Api-Key': `${env.API_KEY}`
  }
})
.then(res => res.json())
.then(res => {
  databaseAnnotatedGames.props.modal.show();
  const tbody = databaseAnnotatedGames.props.form.getElementsByTagName('tbody')[0];
  tbody.replaceChildren();
  res.games.forEach(game => {
    const tr = document.createElement('tr');
    
    const eventTd = document.createElement('td');
    const roundTd = document.createElement('td');
    const yearTd = document.createElement('td');

    const ecoTd = document.createElement('td');
    const whiteTd = document.createElement('td');
    const whiteEloTd = document.createElement('td');
    const blackTd = document.createElement('td');
    const blackEloTd = document.createElement('td');
    const resultTd = document.createElement('td');

    eventTd.appendChild(document.createTextNode(game.Event));
    roundTd.appendChild(document.createTextNode(game.Round));
    yearTd.appendChild(document.createTextNode(game.Date));

    ecoTd.appendChild(document.createTextNode(game.ECO));
    whiteTd.appendChild(document.createTextNode(game.White));
    whiteEloTd.appendChild(document.createTextNode(game.WhiteElo));
    blackTd.appendChild(document.createTextNode(game.Black));
    blackEloTd.appendChild(document.createTextNode(game.BlackElo));
    resultTd.appendChild(document.createTextNode(game.Result));

    tr.appendChild(eventTd);
    tr.appendChild(roundTd);
    tr.appendChild(yearTd);
    tr.appendChild(ecoTd);
    tr.appendChild(whiteTd);
    tr.appendChild(whiteEloTd);
    tr.appendChild(blackTd);
    tr.appendChild(blackEloTd);
    tr.appendChild(resultTd);

    tr.addEventListener('click', event => {
      handleClick(game);
      ravPanel.props.movesMetadataTable.props = game;
      ravPanel.props.movesMetadataTable.mount();
      databaseAnnotatedGames.props.modal.hide();
    });

    tbody.appendChild(tr);
  })
})
.catch(error => {
  // TODO
})
.finally(() => {
  progressModal.props.modal.hide();
});
