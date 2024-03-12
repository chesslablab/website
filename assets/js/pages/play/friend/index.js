import copyInviteCode from '../../../layout/mode/play/copyInviteCode.js';
import playFriend from '../../../layout/mode/play/playFriend.js';
import ws from '../../../layout/mode/play/ws.js';

await ws.connect();

playFriend.modal.show();
