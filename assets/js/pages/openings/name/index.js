import openingsName from '../../../layout/mode/san/openingsName.js';
import ws from '../../../layout/mode/san/ws.js';

await ws.connect();

openingsName.modal.show();
