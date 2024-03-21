import playComputerModal from './playComputerModal.js';
import gameActionsDropdown from '../../../pages/gameActionsDropdown.js';
import historyButtons from '../../../pages/historyButtons.js';
import ws from '../../../stockfishWs.js';

await ws.connect();

localStorage.clear();

playComputerModal.modal.show();
