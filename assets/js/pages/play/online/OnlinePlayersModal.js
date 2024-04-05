import Modal from 'bootstrap/js/dist/modal.js';
import AbstractComponent from '../../../AbstractComponent.js';
import ws from '../../../playWs.js';

export class OnlinePlayersModal extends AbstractComponent {
  mount() {
    const tbody = this.el.querySelector('tbody');
    tbody.replaceChildren();
    if (this.props.games.length > 0) {
      this.props.games.forEach(game => {
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
    }
  }
}

export const onlinePlayersModal = new OnlinePlayersModal(
  document.getElementById('onlinePlayersModal'),
  {
    modal: new Modal(document.getElementById('onlinePlayersModal')),
    games: []
  }
);
