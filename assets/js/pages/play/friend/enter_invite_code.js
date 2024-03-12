import enterInviteCode from '../../../layout/play/enterInviteCode.js';
import ws from '../../../layout/play/ws.js';

await ws.connect();

enterInviteCode.modal.show();
