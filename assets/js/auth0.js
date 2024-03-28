import { createAuth0Client } from '@auth0/auth0-spa-js';

createAuth0Client({
  domain: "dev-ufbne4364ruvn4ru.eu.auth0.com",
  clientId: "Rx7tXv7eJyUj1bfzOYfuR1C6Strr9pm2",
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
    loginButton.classList.add('d-none');
    logoutButton.classList.remove('d-none');
  } else {
    loginButton.classList.remove('d-none');
    logoutButton.classList.add('d-none');
  }
});
