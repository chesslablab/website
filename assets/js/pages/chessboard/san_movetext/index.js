import chessboardSanMovetextModal from './chessboardSanMovetextModal.js';
import gameActionsDropdown from '../../../layout/gameActionsDropdown.js';
import gameStudyDropdown from '../../../layout/gameStudyDropdown.js';
import ws from '../../../layout/san/ws.js';

await ws.connect();

localStorage.clear();

chessboardSanMovetextModal.modal.show();
