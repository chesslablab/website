import { ws, chessboardSanMovetext } from '../../../layout/mode/san/init.js';

await ws.connect();

chessboardSanMovetext.modal.show();
