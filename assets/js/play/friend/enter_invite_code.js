import { ws, enterInviteCode } from '../../../init.js';

await ws.connect();

enterInviteCode.modal.show();
