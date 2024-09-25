import * as env from '../env.js';

const ws = () => {
  if (localStorage.getItem('ws')) {
    if (localStorage.getItem('ws') !== 'random') {
      return localStorage.getItem('ws');
    }
  }

  return env.settings.ws[Math.floor(Math.random() * env.settings.ws.length)];
}

export {
  ws
};
