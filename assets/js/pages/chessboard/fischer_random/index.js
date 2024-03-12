import { ws } from '../../../layout/mode/san/init.js';

localStorage.clear();
await ws.connect();
ws.send('/start 960 fen');
