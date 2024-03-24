import * as env from '../../env.js';

const blackAutocomplete = {
  input: document.querySelector('input[name="Black"]')
}

blackAutocomplete.input.addEventListener('change', (event) => {
  blackAutocomplete.input.value = event.target.value;
});

blackAutocomplete.input.addEventListener('keyup', (event) => {
  const submitButton = document.querySelector('#searchGamesModal form button[type="submit"]');
  const loadingButton = document.querySelector('#searchGamesModal form button[type="button"]');
  const suggestions = document.querySelector('input[name="Black"] + ul');
  if (event.target.value.length % 3 === 0) {
    submitButton.classList.add('d-none');
    loadingButton.classList.remove('d-none');
    fetch(`${env.API_SCHEME}://${env.API_HOST}:${env.API_PORT}/${env.API_VERSION}/autocomplete/player`, {
      method: 'POST',
      headers: {
        'X-Api-Key': `${env.API_KEY}`
      },
      body: JSON.stringify({
        Black: event.target.value
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
          document.querySelector('input[name="Black"]').value = item;
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

export default blackAutocomplete;
