import createGame from '../../../layout/play/createGame.js';
import ws from '../../../layout/play/ws.js';

await ws.connect();

ws.send('/online_games');
