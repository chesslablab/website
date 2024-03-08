import { ws, copyInviteCode, playFriend } from '../../../layout/san/init.js';

await ws.connect();

playFriend.modal.show();
