import { createAuth0Client } from '@auth0/auth0-spa-js';
import Cookies from 'js-cookie';
import * as env from '../env.js';

const auth0Client = await createAuth0Client({
  domain: env.AUTH0_DOMAIN,
  clientId: env.AUTH0_CLIENT_ID
});

const loginButton = document.getElementById('login');

loginButton.addEventListener('click', async (event) => {
  event.preventDefault();
  await auth0Client.loginWithPopup();
  const user = await auth0Client.getUser();
  if (user.email_verified === false) {
    alert("Please verify your email. You're almost there! Just click on the link on the verification email we sent you to complete your signup.");
  } else {
    window.location.href = window.location.origin;
  }
});

const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', (event) => {
  event.preventDefault();
  auth0Client.logout();
});

const isAuthenticated = await auth0Client.isAuthenticated();

if (isAuthenticated) {
  const user = await auth0Client.getUser();
  if (user.hasOwnProperty('email_verified')) {
    if (user.email_verified === true) {
      logoutButton.classList.remove('d-none');
    } else {
      loginButton.classList.remove('d-none');
    }
  } else {
    logoutButton.classList.remove('d-none');
  }
} else {
  loginButton.classList.remove('d-none');
}
