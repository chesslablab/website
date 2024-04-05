import boardActionsDropdown from '../../../elements/boardActionsDropdown.js';
import historyButtons from '../../../elements/historyButtons.js';
import playComputerModal from '../../../elements/playComputerModal.js';
import ws from '../../../stockfishWs.js';

await ws.connect();

localStorage.clear();

playComputerModal.props.modal.show();
