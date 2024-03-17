import ws from '../../../fenWs.js';

await ws.connect();
ws.send('/start classical fen');
