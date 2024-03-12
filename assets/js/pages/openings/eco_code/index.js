import { ws, openingsEcoCode } from '../../../layout/mode/san/init.js';

await ws.connect();

openingsEcoCode.modal.show();
