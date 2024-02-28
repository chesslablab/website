import { ws, copyInviteCode, enterInviteCode } from '../../../init.js';

await ws.connect();
ws.sendMsgItem();

if (localStorage.getItem('inviterColor')) {
  copyInviteCode.modal.show();
} else {
  enterInviteCode.modal.show();
}
