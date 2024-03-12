import { ws } from '../../../layout/mode/fen/init.js';

localStorage.clear();
await ws.connect();
ws.send('/start classical fen');
