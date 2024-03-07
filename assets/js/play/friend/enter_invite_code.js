import { ws, enterInviteCode } from '../../../js/base/san_init.js';

await ws.connect();

enterInviteCode.modal.show();
