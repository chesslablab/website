import { ws } from '../../../js/layout/san/init.js';

localStorage.clear();
await ws.connect();
ws.send('/start 960 fen');
