import { ws, enterInviteCode } from '../../../js/layout/san/init.js';

await ws.connect();

enterInviteCode.modal.show();
