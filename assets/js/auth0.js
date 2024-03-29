import { createAuth0Client } from '@auth0/auth0-spa-js';
import Cookies from 'js-cookie';
import * as env from '../env.js';

const loginButton = document.getElementById("login");

const logoutButton = document.getElementById("logout");

if (Cookies.get(`auth0.${env.AUTH0_CLIENT_ID}.is.authenticated`)) {
  logoutButton.classList.remove('d-none');
  logoutButton.addEventListener('click', (e) => {
    e.preventDefault();
    createAuth0Client({
      domain: env.AUTH0_DOMAIN,
      clientId: env.AUTH0_CLIENT_ID,
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    }).then(async (auth0Client) => {
      auth0Client.logout();
    });
  });

} else {
  loginButton.classList.remove('d-none');
  loginButton.addEventListener('click', (e) => {
    e.preventDefault();
    createAuth0Client({
      domain: env.AUTH0_DOMAIN,
      clientId: env.AUTH0_CLIENT_ID,
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    }).then(async (auth0Client) => {
      await auth0Client.loginWithPopup();
      window.location.href = window.location.origin;
    });
  });
}
