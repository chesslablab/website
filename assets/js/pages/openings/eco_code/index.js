import openingsEcoCode from '../../../layout/mode/san/openingsEcoCode.js';
import ws from '../../../layout/mode/san/ws.js';

await ws.connect();

openingsEcoCode.modal.show();
