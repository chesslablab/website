import chessboardSanMovetextModal from './chessboardSanMovetextModal.js';
import boardActionsDropdown from '../../../elements/boardActionsDropdown.js';
import gameStudyDropdown from '../../../elements/gameStudyDropdown.js';
import historyButtons from '../../../elements/historyButtons.js';
import ws from '../../../sanWs.js';

await ws.connect();

localStorage.clear();

chessboardSanMovetextModal.modal.show();
