import { ws } from '../../../layout/san/init.js';

localStorage.clear();
await ws.connect();
ws.send('/start classical fen');
