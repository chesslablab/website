import { ws, openingsEcoCode } from '../../../init.js';

await ws.connect();

openingsEcoCode.modal.show();
