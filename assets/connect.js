import * as env from './env.js';

const api = () => {
  if (localStorage.getItem('api')) {
    if (localStorage.getItem('api') !== 'random') {
      return localStorage.getItem('api');
    }
  }

  return env.API[Math.floor(Math.random() * env.API.length)];
}

const ws = () => {
  if (localStorage.getItem('ws')) {
    if (localStorage.getItem('ws') !== 'random') {
      return localStorage.getItem('ws');
    }
  }

  return env.WEBSOCKET[Math.floor(Math.random() * env.WEBSOCKET.length)];
}

export {
  api,
  ws
};
