import { ws, enterInviteCode } from '../../../layout/mode/play/init.js';

await ws.connect();

enterInviteCode.modal.show();
