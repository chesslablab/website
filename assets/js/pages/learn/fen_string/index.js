import chessboardFenStringModal from './chessboardFenStringModal.js';
import boardActionsDropdown from '../../../elements/boardActionsDropdown.js';
import gameStudyDropdown from '../../../elements/gameStudyDropdown.js';
import historyButtons from '../../../elements/historyButtons.js';
import ws from '../../../fenWs.js';

await ws.connect();

localStorage.clear();

chessboardFenStringModal.modal.show();
