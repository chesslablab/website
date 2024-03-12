import openingsName from '../../../layout/san/openingsName.js';
import ws from '../../../layout/san/ws.js';

await ws.connect();

openingsName.modal.show();
