import BaseComponent from '../../BaseComponent.js';
import { dataWebSocket } from '../../websockets/DataWebSocket.js';
import { analysisWebSocket } from '../../websockets/game/AnalysisWebSocket.js';
import * as variant from '../../../variant.js';

class RavForm extends BaseComponent {
  mount() {
    this.el.querySelector('select').addEventListener('change', event => {
      event.target.value === variant.CHESS_960
        ? this.el.querySelector('.startPos').classList.remove('d-none')
        : this.el.querySelector('.startPos').classList.add('d-none');
    });
    this.el.addEventListener('submit', async event => {
      event.preventDefault();
      this.progressModal.props.modal.show();
      const formData = new FormData(this.el);
      analysisWebSocket.send('/play_rav', {
        variant: formData.get('variant'),
        movetext: formData.get('rav'),
      });
    });
  }
}

try {
  await Promise.all([
    dataWebSocket.connect(),
    analysisWebSocket.connect()
  ]);
} catch {}

const learnForm = new BaseComponent({
  el: document.querySelector('#learnForm')
});

const ravForm = new RavForm({
  el: document.querySelector('#ravForm')
});

dataWebSocket
  .send(`/annotations_game`)
  .onChange('/annotations_game', data => {
    const tbody = learnForm.el.querySelector('tbody');
    tbody.replaceChildren();
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
      tr.addEventListener('click', async () => {
        learnForm.progressModal.props.modal.show();
        analysisWebSocket.send('/play_rav', {
          variant: variant.CLASSICAL,
          movetext: game.movetext
        });
      });
      tbody.appendChild(tr);
      learnForm.progressModal.props.modal.hide();
    });
  });
