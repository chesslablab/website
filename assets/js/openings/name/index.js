import { ws, openingsName } from '../../../js/base/san_init.js';

await ws.connect();

openingsName.modal.show();
