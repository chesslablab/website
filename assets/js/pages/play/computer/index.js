import { playComputerModal } from './PlayComputerModal.js';
import boardActionsDropdown from '../../boardActionsDropdown.js';
import historyButtons from '../../historyButtons.js';
import ws from '../../../stockfishWs.js';

await ws.connect();

localStorage.clear();

playComputerModal.props.modal.show();
