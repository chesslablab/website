import ws from '../../../layout/fen/ws.js';

await ws.connect();
ws.send('/start 960 fen');
