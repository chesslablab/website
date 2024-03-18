import gameActionsDropdown from '../../../pages/gameActionsDropdown.js';
import gameStudyDropdown from '../../../pages/gameStudyDropdown.js';
import historyButtons from '../../../pages/historyButtons.js';
import ws from '../../../fenWs.js';

await ws.connect();

localStorage.clear();

ws.send('/start 960 fen');
