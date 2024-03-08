import { ws, openingsEcoCode } from '../../../js/layout/san/init.js';

await ws.connect();

openingsEcoCode.modal.show();
