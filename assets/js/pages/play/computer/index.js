import playComputerModal from './playComputerModal.js';
import myChesslaBlabDropdown from '../../../my_chesslablab/myChesslaBlabDropdown.js';
import boardActionsDropdown from '../../../pages/boardActionsDropdown.js';
import historyButtons from '../../../pages/historyButtons.js';
import ws from '../../../stockfishWs.js';

await ws.connect();

localStorage.clear();

playComputerModal.modal.show();
