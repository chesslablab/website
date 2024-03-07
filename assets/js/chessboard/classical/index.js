import { ws } from '../../../js/base/san/init.js';

localStorage.clear();
await ws.connect();
ws.send('/start classical fen');
