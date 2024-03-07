import { ws, chessboardSanMovetext } from '../../../js/base/san_init.js';

await ws.connect();

chessboardSanMovetext.modal.show();
