import { databaseAnnotatedGames } from './DatabaseAnnotatedGames.js';
import { ravPanel } from './RavPanel.js';
import chessboard from '../../chessboard.js';
import { progressModal } from '../../ProgressModal.js';
import { annotationsWebSocket } from '../../../websockets/game/AnnotationsWebSocket.js';
import { dataWebSocket } from '../../../websockets/data/DataWebSocket.js';
import * as variant from '../../../../variant.js';

const handleClick = async (game) => {
  progressModal.props.modal.show();
  const settings = {
    variant: variant.CLASSICAL,
    movetext: game.movetext
  };
  await annotationsWebSocket.connect();
  annotationsWebSocket
    .send(`/play_rav "${JSON.stringify(settings).replace(/"/g, '\\"')}"`)
    .watch('/play_rav', data => {
      ravPanel.props.ravMovesBrowser.current = data.fen.length - 1;
      ravPanel.props.ravMovesBrowser.props.chessboard.setPosition(data.fen[data.fen.length - 1]);
      ravPanel.props.ravMovesBrowser.props = {
        ...ravPanel.props.ravMovesBrowser.props,
        filtered: data.filtered,
        breakdown: data.breakdown,
        fen: data.fen
      };
      ravPanel.props.ravMovesBrowser.mount();
    });
  progressModal.props.modal.hide();
};

sessionStorage.clear();

progressModal.props.modal.show();

await dataWebSocket.connect();

dataWebSocket
  .send(`/annotations_game`)
  .watch('/annotations_game', data => {
    const tbody = databaseAnnotatedGames.props.form.getElementsByTagName('tbody')[0];
    tbody.replaceChildren();
    databaseAnnotatedGames.props.modal.show();
    data.forEach(game => {
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

      tr.addEventListener('click', async (event) => {
        await handleClick(game);
        ravPanel.props.movesMetadataTable.props = game;
        ravPanel.props.movesMetadataTable.mount();
        databaseAnnotatedGames.props.modal.hide();
      });

      tbody.appendChild(tr);
    });
  });

progressModal.props.modal.hide();
