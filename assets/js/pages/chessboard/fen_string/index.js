import { ws } from '../../../layout/mode/fen/init.js';
import chessboardFenString from '../../../layout/mode/fen/chessboardFenString.js';

await ws.connect();

chessboardFenString.modal.show();
