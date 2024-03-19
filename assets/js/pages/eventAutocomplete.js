import Fuse from 'fuse.js';
import * as env from '../../env.js';

const eventAutocomplete = {
  input: document.querySelector('input[name="Event"]'),
  values: async () => {
    let response = await fetch(`${env.API_SCHEME}://${env.API_HOST}:${env.API_PORT}/${env.API_VERSION}/autocomplete/event`, {
      method: 'GET',
      headers: {
        'X-Api-Key': `${env.API_KEY}`
      }
    });

    return await response.json();
  },
  suggest: (result) => {
    console.log(result);
  }
}

const events = await eventAutocomplete.values();

eventAutocomplete.input.addEventListener('change', async (event) => {
  console.log(event.target.value);
});

eventAutocomplete.input.addEventListener('keyup', (event) => {
  const fuse = new Fuse(events);
  eventAutocomplete.suggest(fuse.search(event.target.value, { limit: 20 }));
});

export default eventAutocomplete;
