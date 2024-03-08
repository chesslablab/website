import { ws, chessboardFenString } from '../../../js/layout/san/init.js';

await ws.connect();

chessboardFenString.modal.show();
