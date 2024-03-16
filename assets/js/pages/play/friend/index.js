import copyInviteCodeModal from '../../../layout/play/copyInviteCodeModal.js';
import playFriendModal from '../../../layout/play/playFriendModal.js';
import ws from '../../../layout/play/ws.js';

await ws.connect();

playFriendModal.modal.show();
