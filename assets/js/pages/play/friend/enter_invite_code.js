import enterInviteCode from '../../../layout/mode/play/enterInviteCode.js';
import ws from '../../../layout/mode/play/ws.js';

await ws.connect();

enterInviteCode.modal.show();
