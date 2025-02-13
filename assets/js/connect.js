import * as env from '../env.js';

export const ws = () => {
  if (localStorage.getItem('ws')) {
    if (localStorage.getItem('ws') !== 'random') {
      return localStorage.getItem('ws');
    }
  }

  return env.WEBSOCKET_SERVER[Math.floor(Math.random() * env.WEBSOCKET_SERVER.length)];
}
