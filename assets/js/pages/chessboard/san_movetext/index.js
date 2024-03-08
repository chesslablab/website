import { ws, chessboardSanMovetext } from '../../../js/layout/san/init.js';

await ws.connect();

chessboardSanMovetext.modal.show();
