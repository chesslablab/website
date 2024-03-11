import { ws, playOnline } from '../../../layout/san/init.js';

await ws.connect();

ws.send('/online_games');

playOnline.modal.show();
