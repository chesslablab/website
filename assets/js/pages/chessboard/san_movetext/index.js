import { ws, chessboardSanMovetext } from '../../../layout/san/init.js';

await ws.connect();

chessboardSanMovetext.modal.show();
