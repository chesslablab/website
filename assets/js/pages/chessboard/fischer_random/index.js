import ws from '../../../fenWs.js';

await ws.connect();
ws.send('/start 960 fen');
