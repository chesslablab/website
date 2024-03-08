import { ws, openingsName } from '../../../js/layout/san/init.js';

await ws.connect();

openingsName.modal.show();
