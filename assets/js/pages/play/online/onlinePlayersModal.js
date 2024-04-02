import Modal from 'bootstrap/js/dist/modal.js';
import ws from '../../../playWs.js';

const onlinePlayersModal = {
  modal: new Modal(document.getElementById('onlinePlayersModal')),
  mount: (games) => {
    const alert = document.querySelector('#onlinePlayersModal .alert');
    const tbody = document.querySelector('#onlinePlayersModal tbody');
    tbody.replaceChildren();
    if (games.length > 0) {
      alert.classList.add('d-none');
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
      const alert = document.querySelector('#onlinePlayersModal .alert');
      alert.classList.remove('d-none');
    }
  }
}

export default onlinePlayersModal;
