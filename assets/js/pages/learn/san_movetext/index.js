import chessboardSanMovetextModal from './chessboardSanMovetextModal.js';
import boardActionsDropdown from '../../boardActionsDropdown.js';
import { gameStudyDropdown } from '../../GameStudyDropdown.js';
import historyButtons from '../../historyButtons.js';
import ws from '../../../sanWs.js';

await ws.connect();

localStorage.clear();

chessboardSanMovetextModal.modal.show();
