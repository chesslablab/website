import { createAuth0Client } from '@auth0/auth0-spa-js';
import * as env from '../../env.js';

const auth0Client = await createAuth0Client({
  domain: env.AUTH0_DOMAIN,
  clientId: env.AUTH0_CLIENT_ID
});

const ul = document.querySelector('#myChesslaBlabDropdown ul');

if (await auth0Client.isAuthenticated()) {
  const user = await auth0Client.getUser();
  if (user.hasOwnProperty('email_verified')) {
    if (user.email_verified === true) {
      ul.children.item(1).classList.remove('d-none');
      ul.children.item(2).classList.remove('d-none');
    } else {
      ul.children.item(0).classList.remove('d-none');
    }
  } else {
    ul.children.item(0).classList.remove('d-none');
  }
} else {
  ul.children.item(0).classList.remove('d-none');
}

ul.children.item(0).addEventListener('click',  async (event) => {
  event.preventDefault();
  await auth0Client.loginWithPopup();
  const user = await auth0Client.getUser();
  if (user.email_verified === false) {
    alert("Please verify your email. You're almost there! Just click on the link on the verification email we sent you to complete your signup.");
  } else {
    window.location.href = window.location.origin;
  }
});

ul.children.item(1).addEventListener('click', (event) => {
  event.preventDefault();
  console.log('TODO');
});

ul.children.item(2).addEventListener('click', (event) => {
  event.preventDefault();
  auth0Client.logout();
});
