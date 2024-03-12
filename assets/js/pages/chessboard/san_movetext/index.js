import ws from '../../../layout/san/ws.js';
import chessboardSanMovetext from '../../../layout/san/chessboardSanMovetext.js';

await ws.connect();

chessboardSanMovetext.modal.show();
