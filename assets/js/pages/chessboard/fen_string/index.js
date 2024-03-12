import ws from '../../../layout/fen/ws.js';
import chessboardFenString from '../../../layout/fen/chessboardFenString.js';

await ws.connect();

chessboardFenString.modal.show();
