import { ws } from '../../init.js';

const msg = JSON.parse(localStorage.getItem('msg'));

await ws.connect();

if (msg) {
  await ws.send(`/start classical san "${JSON.stringify(msg.payload.add).replace(/"/g, '\\"')}"`);
} else {
  await ws.send(`/start classical fen`);
}
