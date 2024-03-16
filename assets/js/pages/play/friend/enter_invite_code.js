import enterInviteCodeModal from '../../../layout/play/enterInviteCodeModal.js';
import ws from '../../../layout/play/ws.js';

await ws.connect();

enterInviteCodeModal.modal.show();
