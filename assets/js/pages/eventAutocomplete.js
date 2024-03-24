import * as env from '../../env.js';

const eventAutocomplete = {
  input: document.querySelector('input[name="Event"]')
}

eventAutocomplete.input.addEventListener('change', (event) => {
  eventAutocomplete.input.value = event.target.value;
});

eventAutocomplete.input.addEventListener('keyup', (event) => {
  const submitButton = document.querySelector('#searchGamesModal form button[type="submit"]');
  const loadingButton = document.querySelector('#searchGamesModal form button[type="button"]');
  const suggestions = document.querySelector('input[name="Event"] + ul');
  if (event.target.value.length > 2) {
    submitButton.classList.add('d-none');
    loadingButton.classList.remove('d-none');
    fetch(`${env.API_SCHEME}://${env.API_HOST}:${env.API_PORT}/${env.API_VERSION}/autocomplete/event`, {
      method: 'POST',
      headers: {
        'X-Api-Key': `${env.API_KEY}`
      },
      body: JSON.stringify({
        Event: event.target.value
      })
    })
    .then(res => res.json())
    .then(res => {
      suggestions.classList.remove('d-none');
      suggestions.replaceChildren();
      res.forEach(item => {
        const li = document.createElement('li');
        li.appendChild(document.createTextNode(item));
        li.addEventListener('click', () => {
          document.querySelector('input[name="Event"]').value = item;
          suggestions.classList.add('d-none');
        });
        suggestions.append(li);
      });
    })
    .catch(error => {
      // TODO
    })
    .finally(() => {
      submitButton.classList.remove('d-none');
      loadingButton.classList.add('d-none');
    });
  }
});

export default eventAutocomplete;
