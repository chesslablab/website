import * as env from '../../env.js';

const fetchEvents = async () => {
  let response = await fetch(`${env.API_SCHEME}://${env.API_HOST}:${env.API_PORT}/${env.API_VERSION}/autocomplete/event`, {
    method: 'GET',
    headers: {
      'X-Api-Key': `${env.API_KEY}`
    }
  });

  return await response.json();
}

const eventAutocomplete = {
  input: document.querySelector('input[name="Event"]'),
  values: fetchEvents()
}

eventAutocomplete.input.addEventListener('change', async (event) => {
  console.log(event.target.value);
  const foobar = await eventAutocomplete.values;
  console.log(foobar);
});

eventAutocomplete.input.addEventListener('keyup', (event) => {
  console.log(event.target.value);
});

export default eventAutocomplete;
