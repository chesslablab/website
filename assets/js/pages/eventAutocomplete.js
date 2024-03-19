import Fuse from 'fuse.js';
import progressModal from './progressModal.js';
import * as env from '../../env.js';

const eventAutocomplete = {
  input: document.querySelector('input[name="Event"]'),
  values: async () => {
    progressModal.modal.show();
    let response = await fetch(`${env.API_SCHEME}://${env.API_HOST}:${env.API_PORT}/${env.API_VERSION}/autocomplete/event`, {
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
    const suggestions = document.querySelector('input[name="Event"] + ul');
    suggestions.classList.remove('d-none');
    suggestions.replaceChildren();
    result.forEach(item => {
      const li = document.createElement('li');
      const liText = document.createTextNode(item.item);
      li.appendChild(liText);
      li.addEventListener('click', () => {
        document.querySelector('input[name="Event"]').value = item.item;
        suggestions.classList.add('d-none');
      });
      suggestions.append(li);
    });
  }
}

const events = await eventAutocomplete.values();

eventAutocomplete.input.addEventListener('change', async (event) => {
  eventAutocomplete.input.value = event.target.value;
});

eventAutocomplete.input.addEventListener('keyup', (event) => {
  const fuse = new Fuse(events);
  eventAutocomplete.suggest(fuse.search(event.target.value, { limit: 10 }));
});

export default eventAutocomplete;
