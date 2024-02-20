import { ws } from '../init.js';

await ws.connect();
await ws.send('/start classical fen');
