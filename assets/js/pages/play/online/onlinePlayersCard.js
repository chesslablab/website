import createGameModal from './createGameModal.js';
import ws from '../../../playWs.js';

const onlinePlayersCard = {
  card: document.querySelector('#onlinePlayers'),
  table: document.querySelector('#onlinePlayers table'),
  button: document.querySelector('#onlinePlayers button'),
  mount: (games) => {
    const tbody = document.querySelector('#onlinePlayers tbody');
    tbody.replaceChildren();
    if (games.length > 0) {
      games.forEach(game => {
        const tr = document.createElement('tr');
        const timeTd = document.createElement('td');
        const colorTd = document.createElement('td');
        const variantTd = document.createElement('td');
        timeTd.appendChild(document.createTextNode(`${game.min} m + ${game.increment} s`));
        colorTd.appendChild(document.createTextNode(game.color));
        variantTd.appendChild(document.createTextNode(game.variant));
        tr.appendChild(timeTd);
        tr.appendChild(colorTd);
        tr.appendChild(variantTd);
        if (localStorage.getItem('hash') !== game.hash) {
          tr.addEventListener('click', () => {
            ws.send(`/accept ${game.hash}`);
          });
        } else {
          timeTd.style.cursor = 'default';
          colorTd.style.cursor = 'default';
          variantTd.style.cursor = 'default';
        }
        tbody.appendChild(tr);
      });
    } else {
      const tr = document.createElement('tr');
      const td = document.createElement('td');
      td.style.fontSize = '13px';
      const tdText = document.createTextNode('There are no players connected at the moment, be the first one to create a game!');
      td.appendChild(tdText);
      tr.appendChild(td);
      tbody.appendChild(tr);
    }

    document.querySelector('#onlinePlayers button').addEventListener('click', async (event) => {
      event.preventDefault();
      createGameModal.modal.show();
    });
  }
}

export default onlinePlayersCard;
