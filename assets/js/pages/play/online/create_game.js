import playOnline from '../../../layout/play/playOnline.js';
import ws from '../../../layout/play/ws.js';

await ws.connect();

playOnline.modal.show();
