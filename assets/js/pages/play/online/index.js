import { ws, playOnline } from '../../../layout/san/init.js';

await ws.connect();

playOnline.modal.show();
