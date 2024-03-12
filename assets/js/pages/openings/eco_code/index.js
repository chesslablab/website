import openingsEcoCode from '../../../layout/san/openingsEcoCode.js';
import ws from '../../../layout/san/ws.js';

await ws.connect();

openingsEcoCode.modal.show();
