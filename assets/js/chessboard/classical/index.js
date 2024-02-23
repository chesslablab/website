import { ws } from '../../init.js';

await ws.connect();

ws.send('/start classical fen');
