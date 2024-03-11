import { ws, enterInviteCode } from '../../../layout/play/init.js';

await ws.connect();

enterInviteCode.modal.show();
