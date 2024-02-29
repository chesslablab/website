import { ws, copyInviteCode, playFriend } from '../../../init.js';

await ws.connect();

playFriend.modal.show();
