import copyInviteCodeModal from '../../../layout/play/copyInviteCodeModal.js';
import playFriend from '../../../layout/play/playFriend.js';
import ws from '../../../layout/play/ws.js';

await ws.connect();

playFriend.modal.show();
