import chessboardFenStringModal from './chessboardFenStringModal.js';
import boardActionsDropdown from '../../boardActionsDropdown.js';
import { gameStudyDropdown } from '../../GameStudyDropdown.js';
import historyButtons from '../../historyButtons.js';
import ws from '../../../fenWs.js';

await ws.connect();

localStorage.clear();

chessboardFenStringModal.modal.show();
