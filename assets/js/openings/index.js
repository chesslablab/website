import { ws } from '../init.js';

const command = JSON.parse(localStorage.getItem('command'));

await ws.connect();

if (command) {
  await ws.send(`/start classical san "${JSON.stringify(command?.add)?.replace(/"/g, '\\"')}"`);
} else {
  await ws.send(`/start classical fen`);
}
