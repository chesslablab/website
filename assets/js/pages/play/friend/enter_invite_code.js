import { ws, enterInviteCode } from '../../../layout/san/init.js';

await ws.connect();

enterInviteCode.modal.show();
