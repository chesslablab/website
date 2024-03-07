import { ws, chessboardFenString } from '../../../js/base/san_init.js';

await ws.connect();

chessboardFenString.modal.show();
