import * as env from './env.js';

const api = () => {
  if (localStorage.getItem('api')) {
    if (localStorage.getItem('api') !== 'random') {
      return localStorage.getItem('api');
    }
  }

  return env.API_ENDPOINTS[Math.floor(Math.random() * env.API_ENDPOINTS.length)];
}

const ws = () => {
  if (localStorage.getItem('ws')) {
    if (localStorage.getItem('ws') !== 'random') {
      return localStorage.getItem('ws');
    }
  }

  return env.WEBSOCKET_HOSTS[Math.floor(Math.random() * env.WEBSOCKET_HOSTS.length)];
}

export {
  api,
  ws
};
