import { ws } from '../../../init.js';

localStorage.clear();
await ws.connect();
ws.send('/start classical fen');
