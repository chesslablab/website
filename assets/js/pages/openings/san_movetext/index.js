import openingsSanMovetext from '../../../layout/mode/san/openingsSanMovetext.js';
import ws from '../../../layout/mode/san/ws.js';

await ws.connect();

openingsSanMovetext.modal.show();
