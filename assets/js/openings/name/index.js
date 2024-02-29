import { ws, openingsName } from '../../../init.js';

await ws.connect();

openingsName.modal.show();
