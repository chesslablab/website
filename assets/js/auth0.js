import { createAuth0Client } from '@auth0/auth0-spa-js';
import * as env from '../env.js';

createAuth0Client({
  domain: env.AUTH0_DOMAIN,
  clientId: env.AUTH0_CLIENT_ID,
  authorizationParams: {
    redirect_uri: window.location.origin
  }
}).then(async (auth0Client) => {

  const loginButton = document.getElementById("login");

  loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    auth0Client.loginWithRedirect();
  });

  if (location.search.includes("state=") &&
      (location.search.includes("code=") ||
      location.search.includes("error="))) {
    await auth0Client.handleRedirectCallback();
    window.history.replaceState({}, document.title, "/");
  }

  const logoutButton = document.getElementById("logout");

  logoutButton.addEventListener("click", (e) => {
    e.preventDefault();
    auth0Client.logout();
  });

  const isAuthenticated = await auth0Client.isAuthenticated();

  if (isAuthenticated) {
    logoutButton.classList.remove('d-none');
  } else {
    loginButton.classList.remove('d-none');
  }
});
