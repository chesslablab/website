import ws from './ws.js';

const onlinePlayers = {
  domElem: (games) => {
    const tbody = document.querySelector('#onlinePlayers tbody')
    tbody.replaceChildren();
    const tr = document.createElement('tr');
    if (games.length > 0) {
      games.forEach(game => {
        const usernameTd = document.createElement('td');
        const usernameText = document.createTextNode('Guest');
        const minTd = document.createElement('td');
        const minText = document.createTextNode(game.min);
        const incrementTd = document.createElement('td');
        const incrementText = document.createTextNode(game.increment);
        const colorTd = document.createElement('td');
        const colorText = document.createTextNode(game.color);
        const variantTd = document.createElement('td');
        const variantText = document.createTextNode(game.variant);
        usernameTd.appendChild(usernameText);
        minTd.appendChild(minText);
        incrementTd.appendChild(incrementText);
        colorTd.appendChild(colorText);
        variantTd.appendChild(variantText);
        tr.appendChild(usernameTd);
        tr.appendChild(minTd);
        tr.appendChild(incrementTd);
        tr.appendChild(colorTd);
        tr.appendChild(variantTd);
        tr.addEventListener('click', () => {
          ws.send(`/accept ${game.hash}`);
        });
      });
    } else {
        const td = document.createElement('td');
        const text = document.createTextNode('There are currently no players.');
        td.appendChild(text);
        tr.appendChild(td);
    }
    tbody.appendChild(tr);
  }
}

export default onlinePlayers;
