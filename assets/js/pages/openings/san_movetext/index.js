import openingsSanMovetext from './openingsSanMovetext.js';
import gameActionsDropdown from '../../../layout/gameActionsDropdown.js';
import gameStudyDropdown from '../../../layout/gameStudyDropdown.js';
import historyButtons from '../../../layout/historyButtons.js';
import ws from '../../../layout/san/ws.js';

await ws.connect();

localStorage.clear();

openingsSanMovetext.modal.show();
