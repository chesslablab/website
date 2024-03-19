import * as env from '../../env.js';

fetch(`${env.API_SCHEME}://${env.API_HOST}:${env.API_PORT}/${env.API_VERSION}/autocomplete/event`, {
  method: 'GET',
  headers: {
    'X-Api-Key': `${env.API_KEY}`
  }
})
.then(res => res.json())
.then(res => {
  console.log(res);
})
.catch(error => {
  // TODO
})
.finally(() => {
  // TODO
});

const eventAutocomplete = {
  input: document.querySelector('input[name="Event"]')
}

eventAutocomplete.input.addEventListener('change', (event) => {
  console.log(event.target.value);
});

eventAutocomplete.input.addEventListener('keyup', (event) => {
  console.log(event.target.value);
});

export default eventAutocomplete;
