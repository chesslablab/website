import { ws, chessboardFenString } from '../../../layout/san/init.js';

await ws.connect();

chessboardFenString.modal.show();
