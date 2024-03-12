import copyInviteCode from '../../../layout/play/copyInviteCode.js';
import playFriend from '../../../layout/play/playFriend.js';
import ws from '../../../layout/play/ws.js';

await ws.connect();

playFriend.modal.show();
