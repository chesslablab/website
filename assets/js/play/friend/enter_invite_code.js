import { ws, enterInviteCode } from '../../../js/base/san/init.js';

await ws.connect();

enterInviteCode.modal.show();
