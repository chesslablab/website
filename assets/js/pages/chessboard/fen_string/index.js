import { ws, chessboardFenString } from '../../../layout/mode/san/init.js';

await ws.connect();

chessboardFenString.modal.show();
