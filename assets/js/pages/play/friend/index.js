import { ws, copyInviteCode, playFriend } from '../../../layout/mode/play/init.js';

await ws.connect();

playFriend.modal.show();
