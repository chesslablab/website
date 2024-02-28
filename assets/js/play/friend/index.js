import { ws, copyInviteCodeModal } from '../../../init.js';

await ws.connect();
ws.sendMsgItem();

copyInviteCodeModal.show();
