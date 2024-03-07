import { ws, openingsName } from '../../../js/base/san/init.js';

await ws.connect();

openingsName.modal.show();
