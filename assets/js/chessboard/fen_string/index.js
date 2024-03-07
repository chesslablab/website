import { ws, chessboardFenString } from '../../../js/base/san/init.js';

await ws.connect();

chessboardFenString.modal.show();
