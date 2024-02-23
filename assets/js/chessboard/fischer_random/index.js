import { ws } from '../../init.js';

await ws.connect();

ws.send('/start 960 fen');
