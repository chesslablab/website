import { ws } from '../../../js/base/san_init.js';

localStorage.clear();
await ws.connect();
ws.send('/start 960 fen');
