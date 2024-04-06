import boardActionsDropdown from '../../boardActionsDropdown.js';
import { gameStudyDropdown } from '../../GameStudyDropdown.js';
import historyButtons from '../../historyButtons.js';
import { fenWebSocket } from '../../../FenWebSocket.js';

await fenWebSocket.connect();

localStorage.clear();

fenWebSocket.send('/start classical fen');
