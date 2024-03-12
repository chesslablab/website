import openingsSanMovetext from '../../../layout/san/openingsSanMovetext.js';
import ws from '../../../layout/san/ws.js';

await ws.connect();

openingsSanMovetext.modal.show();
