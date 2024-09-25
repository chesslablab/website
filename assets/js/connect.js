import * as env from '../env.js';

const ws = () => {
  if (localStorage.getItem('ws')) {
    if (localStorage.getItem('ws') !== 'random') {
      return localStorage.getItem('ws');
    }
  }

  return env.SETTINGS.ws[Math.floor(Math.random() * env.SETTINGS.ws.length)];
}

export {
  ws
};
