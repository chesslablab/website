import { ws, openingsEcoCode } from '../../../js/base/san/init.js';

await ws.connect();

openingsEcoCode.modal.show();
