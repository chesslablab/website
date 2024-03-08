import { ws, openingsEcoCode } from '../../../layout/san/init.js';

await ws.connect();

openingsEcoCode.modal.show();
