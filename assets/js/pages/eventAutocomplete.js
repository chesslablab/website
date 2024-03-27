import * as env from '../../env.js';

const eventAutocomplete = {
  input: document.querySelector('input[name="Event"]'),
  ul: document.querySelector('input[name="Event"] + ul')
}

eventAutocomplete.input.addEventListener('focusin', (event) => {
  event.preventDefault();
  eventAutocomplete.ul.classList.remove('invisible');
});

eventAutocomplete.ul.addEventListener('focusout', (event) => {
  event.preventDefault();
  eventAutocomplete.ul.classList.add('invisible');
});

eventAutocomplete.input.addEventListener('change', (event) => {
  event.preventDefault();
  eventAutocomplete.input.value = event.target.value;
});

eventAutocomplete.input.addEventListener('keyup', (event) => {
  event.preventDefault();
  const submitButton = document.querySelector('#searchGamesModal form button[type="submit"]');
  const loadingButton = document.querySelector('#searchGamesModal form button[type="button"]');
  if (event.target.value.length % 3 === 0) {
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
      eventAutocomplete.ul.classList.remove('invisible');
      eventAutocomplete.ul.replaceChildren();
      res.forEach(item => {
        const li = document.createElement('li');
        li.appendChild(document.createTextNode(item));
        li.addEventListener('click', (event) => {
          event.preventDefault();
          document.querySelector('input[name="Event"]').value = item;
          eventAutocomplete.ul.classList.add('invisible');
        });
        eventAutocomplete.ul.append(li);
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
