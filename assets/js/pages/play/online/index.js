import playOnline from '../../../layout/mode/play/playOnline.js';
import ws from '../../../layout/mode/play/ws.js';

await ws.connect();

ws.send('/online_games');

playOnline.modal.show();
