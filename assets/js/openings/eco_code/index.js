import { ws, openingsEcoCode } from '../../../js/base/san_init.js';

await ws.connect();

openingsEcoCode.modal.show();
