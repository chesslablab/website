import { ws, copyInviteCode, playFriend } from '../../../layout/play/init.js';

await ws.connect();

playFriend.modal.show();
