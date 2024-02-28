import { ws, copyInviteCode, enterInviteCodeModal } from '../../../init.js';

await ws.connect();
ws.sendMsgItem();

if (localStorage.getItem('inviterColor')) {
  copyInviteCode.modal.show();
} else {
  enterInviteCodeModal.show();
}
