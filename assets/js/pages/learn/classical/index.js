import boardActionsDropdown from '../../boardActionsDropdown.js';
import { gameStudyDropdown } from '../../GameStudyDropdown.js';
import historyButtons from '../../historyButtons.js';
import ws from '../../../fenWs.js';

await ws.connect();

localStorage.clear();

ws.send('/start classical fen');
