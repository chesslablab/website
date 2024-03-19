import Fuse from 'fuse.js';
import progressModal from './progressModal.js';
import * as env from '../../env.js';

const playerAutocomplete = {
  white: document.querySelector('input[name="White"]'),
  black: document.querySelector('input[name="Black"]'),
  players: async () => {
    progressModal.modal.show();
    let response = await fetch(`${env.API_SCHEME}://${env.API_HOST}:${env.API_PORT}/${env.API_VERSION}/autocomplete/player`, {
      method: 'GET',
      headers: {
        'X-Api-Key': `${env.API_KEY}`
      }
    })
    .catch(error => {
      // TODO
    })
    .finally(() => {
      progressModal.modal.hide();
    });

    return await response.json();
  },
  whiteUl: (result) => {
    const ul = document.querySelector('input[name="White"] + ul');
    ul.classList.remove('d-none');
    ul.replaceChildren();
    result.forEach(item => {
      const li = document.createElement('li');
      const liText = document.createTextNode(item.item);
      li.appendChild(liText);
      li.addEventListener('click', () => {
        document.querySelector('input[name="White"]').value = item.item;
        ul.classList.add('d-none');
      });
      ul.append(li);
    });
  },
  blackUl: (result) => {
    const ul = document.querySelector('input[name="Black"] + ul');
    ul.classList.remove('d-none');
    ul.replaceChildren();
    result.forEach(item => {
      const li = document.createElement('li');
      const liText = document.createTextNode(item.item);
      li.appendChild(liText);
      li.addEventListener('click', () => {
        document.querySelector('input[name="Black"]').value = item.item;
        ul.classList.add('d-none');
      });
      ul.append(li);
    });
  }
}

const players = await playerAutocomplete.players();

playerAutocomplete.white.addEventListener('change', async (event) => {
  playerAutocomplete.white.value = event.target.value;
});

playerAutocomplete.white.addEventListener('keyup', (event) => {
  const fuse = new Fuse(players);
  playerAutocomplete.whiteUl(fuse.search(event.target.value, { limit: 10 }));
});

playerAutocomplete.black.addEventListener('change', async (event) => {
  playerAutocomplete.black.value = event.target.value;
});

playerAutocomplete.black.addEventListener('keyup', (event) => {
  const fuse = new Fuse(players);
  playerAutocomplete.blackUl(fuse.search(event.target.value, { limit: 10 }));
});

export default playerAutocomplete;
