import { ws, copyInviteCodeModal, enterInviteCodeModal } from '../../../init.js';

await ws.connect();
ws.sendMsgItem();

if (localStorage.getItem('inviterColor')) {
  copyInviteCodeModal.show();
} else {
  enterInviteCodeModal.show();
}
