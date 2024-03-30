import { createAuth0Client } from '@auth0/auth0-spa-js';
import Modal from 'bootstrap/js/dist/modal.js';
import * as env from '../../env.js';

const settingsModal = {
  modal: new Modal(document.getElementById('settingsModal')),
  form: document.querySelector('#settingsModal form')
}

settingsModal.form.querySelector('button#deleteAccount').addEventListener('click', async event => {
  event.preventDefault();

  const auth0Client = await createAuth0Client({
    domain: env.AUTH0_DOMAIN,
    clientId: env.AUTH0_CLIENT_ID
  });

  const token = await auth0Client.getTokenSilently();

  const user = await auth0Client.getUser();

  fetch(`https://login.auth0.com/api/v2/users/${user.sub}`, {
    method: 'POST',
    redirect: 'follow',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
  });

export default settingsModal;
