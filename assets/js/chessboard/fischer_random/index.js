import { ws } from '../../init.js';

await ws.connect();
await ws.send('/start 960 fen');
