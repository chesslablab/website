import Modal from 'bootstrap/js/dist/modal.js';
import ws from '../../../playWs.js';

const onlinePlayersModal = {
  modal: new Modal(document.getElementById('onlinePlayersModal')),
  mount: (games) => {
    const alerts = document.querySelectorAll('#onlinePlayersModal .alert');
    const tbody = document.querySelector('#onlinePlayersModal tbody');
    alerts[0].classList.add('d-none');
    alerts[1].classList.add('d-none');
    tbody.parentNode.classList.add('d-none');
    tbody.replaceChildren();
    if (games.length > 0) {
      alerts[1].classList.remove('d-none');
      tbody.parentNode.classList.remove('d-none');
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
      alerts[0].classList.remove('d-none');
    }
  }
}

export default onlinePlayersModal;
