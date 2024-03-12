import ws from '../../../layout/mode/fen/ws.js';

localStorage.clear();
await ws.connect();
ws.send('/start classical fen');
