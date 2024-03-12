import ws from '../../../layout/mode/san/ws.js';
import chessboardSanMovetext from '../../../layout/mode/san/chessboardSanMovetext.js';

await ws.connect();

chessboardSanMovetext.modal.show();
