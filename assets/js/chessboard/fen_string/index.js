import { ws, chessboardFenString } from '../../../init.js';

await ws.connect();

chessboardFenString.modal.show();
