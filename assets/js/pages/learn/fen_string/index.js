import fenStringModal from './fenStringModal.js';
import boardActionsDropdown from '../../boardActionsDropdown.js';
import { gameStudyDropdown } from '../../GameStudyDropdown.js';
import historyButtons from '../../historyButtons.js';
import { fenWebSocket } from '../../../FenWebSocket.js';

await fenWebSocket.connect();

localStorage.clear();

fenStringModal.modal.show();
