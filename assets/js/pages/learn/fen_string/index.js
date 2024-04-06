import chessboardFenStringModal from './chessboardFenStringModal.js';
import boardActionsDropdown from '../../boardActionsDropdown.js';
import { gameStudyDropdown } from '../../GameStudyDropdown.js';
import historyButtons from '../../historyButtons.js';
import { fenWebSocket } from '../../../FenWebSocket.js';

await fenWebSocket.connect();

localStorage.clear();

chessboardFenStringModal.modal.show();
