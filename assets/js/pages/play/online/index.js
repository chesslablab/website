import ws from '../../../layout/index/ws.js';

await ws.connect();

ws.send('/online_games');
