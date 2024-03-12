import ws from '../../../layout/fen/ws.js';

localStorage.clear();
await ws.connect();
ws.send('/start classical fen');
