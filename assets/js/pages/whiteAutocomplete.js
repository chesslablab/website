import * as env from '../../env.js';

const whiteAutocomplete = {
  input: document.querySelector('input[name="White"]')
}

whiteAutocomplete.input.addEventListener('change', (event) => {
  whiteAutocomplete.input.value = event.target.value;
});

whiteAutocomplete.input.addEventListener('keyup', (event) => {
  if (event.target.value.length % 2 === 0) {
    fetch(`${env.API_SCHEME}://${env.API_HOST}:${env.API_PORT}/${env.API_VERSION}/autocomplete/player`, {
      method: 'POST',
      headers: {
        'X-Api-Key': `${env.API_KEY}`
      },
      body: JSON.stringify({
        White: event.target.value
      })
    })
    .then(res => res.json())
    .then(res => {
      const suggestions = document.querySelector('input[name="White"] + ul');
      suggestions.classList.remove('d-none');
      suggestions.replaceChildren();
      res.forEach(item => {
        const li = document.createElement('li');
        li.appendChild(document.createTextNode(item));
        li.addEventListener('click', () => {
          document.querySelector('input[name="White"]').value = item;
          suggestions.classList.add('d-none');
        });
        suggestions.append(li);
      });
    })
    .catch(error => {
      // TODO
    })
    .finally(() => {
      // TODO
    });
  }
});

export default whiteAutocomplete;
