import chessboardFenStringModal from './chessboardFenStringModal.js';
import gameActionsDropdown from '../../../layout/gameActionsDropdown.js';
import gameStudyDropdown from '../../../layout/gameStudyDropdown.js';
import ws from '../../../layout/fen/ws.js';

await ws.connect();

localStorage.clear();

chessboardFenStringModal.modal.show();
