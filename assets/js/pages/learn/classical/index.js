import boardActionsDropdown from '../../../pages/boardActionsDropdown.js';
import gameStudyDropdown from '../../../pages/gameStudyDropdown.js';
import historyButtons from '../../../pages/historyButtons.js';
import ws from '../../../fenWs.js';

await ws.connect();

localStorage.clear();

ws.send('/start classical fen');
