import { ws } from '../../init.js';

const msg = JSON.parse(localStorage.getItem('msg'));

await ws.connect();
await ws.send(`/start ${msg.payload.variant} ${msg.payload.mode} "${JSON.stringify(msg.payload.add).replace(/"/g, '\\"')}"`);
