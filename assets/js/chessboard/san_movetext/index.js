import { ws, chessboardSanMovetext } from '../../../js/base/san/init.js';

await ws.connect();

chessboardSanMovetext.modal.show();
