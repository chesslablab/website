import Fuse from 'fuse.js';
import progressModal from './progressModal.js';
import * as env from '../../env.js';

const blackAutocomplete = {
  input: document.querySelector('input[name="Black"]'),
  values: async () => {
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
  suggest: (result) => {
    const suggestions = document.querySelector('input[name="Black"] + ul');
    suggestions.classList.remove('d-none');
    suggestions.replaceChildren();
    result.forEach(item => {
      const li = document.createElement('li');
      const liText = document.createTextNode(item.item);
      li.appendChild(liText);
      li.addEventListener('click', () => {
        document.querySelector('input[name="Black"]').value = item.item;
        suggestions.classList.add('d-none');
      });
      suggestions.append(li);
    });
  }
}

const players = await blackAutocomplete.values();

blackAutocomplete.input.addEventListener('change', async (event) => {
  blackAutocomplete.input.value = event.target.value;
});

blackAutocomplete.input.addEventListener('keyup', (event) => {
  const fuse = new Fuse(players);
  blackAutocomplete.suggest(fuse.search(event.target.value, { limit: 10 }));
});

export default blackAutocomplete;
