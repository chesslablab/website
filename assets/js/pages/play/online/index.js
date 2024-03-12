import { ws, playOnline } from '../../../layout/mode/play/init.js';

await ws.connect();

ws.send('/online_games');

playOnline.modal.show();
