import { ws, openingsName } from '../../../layout/san/init.js';

await ws.connect();

openingsName.modal.show();
