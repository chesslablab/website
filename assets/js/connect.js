import * as env from '../env.js';

const wsBinary = () => {
  // TODO

  return 'wss://async.chesslablab.org:7443';
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
  wsBinary,
  wsData,
  wsGame
};
