import { ws, openingsName } from '../../../layout/mode/san/init.js';

await ws.connect();

openingsName.modal.show();
