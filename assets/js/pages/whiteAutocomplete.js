import Fuse from 'fuse.js';
import progressModal from './progressModal.js';
import * as env from '../../env.js';

const whiteAutocomplete = {
  input: document.querySelector('input[name="White"]'),
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
    const suggestions = document.querySelector('input[name="White"] + ul');
    suggestions.classList.remove('d-none');
    suggestions.replaceChildren();
    result.forEach(item => {
      const li = document.createElement('li');
      const liText = document.createTextNode(item.item);
      li.appendChild(liText);
      li.addEventListener('click', () => {
        document.querySelector('input[name="White"]').value = item.item;
        suggestions.classList.add('d-none');
      });
      suggestions.append(li);
    });
  }
}

const players = await whiteAutocomplete.values();

whiteAutocomplete.input.addEventListener('change', async (event) => {
  whiteAutocomplete.input.value = event.target.value;
});

whiteAutocomplete.input.addEventListener('keyup', (event) => {
  const fuse = new Fuse(players);
  whiteAutocomplete.suggest(fuse.search(event.target.value, { limit: 10 }));
});

export default whiteAutocomplete;