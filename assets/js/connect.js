import * as env from '../env.js';

const api = () => {
  if (localStorage.getItem('api')) {
    if (localStorage.getItem('api') !== 'random') {
      return localStorage.getItem('api');
    }
  }

  return env.API[Math.floor(Math.random() * env.API.length)];
}

const wsData = () => {
  // TODO

  return 'wss://async.chesslablab.org:9443';
}

const wsGame = () => {
  if (localStorage.getItem('ws')) {
    if (localStorage.getItem('ws') !== 'random') {
      return localStorage.getItem('ws');
    }
  }

  return env.WEBSOCKET_GAME[Math.floor(Math.random() * env.WEBSOCKET_GAME.length)];
}

export {
  api,
  wsGame,
  wsData
};
