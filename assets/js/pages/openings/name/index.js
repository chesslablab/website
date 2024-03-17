import openingsName from './openingsName.js';
import gameActionsDropdown from '../../../layout/gameActionsDropdown.js';
import gameStudyDropdown from '../../../layout/gameStudyDropdown.js';
import historyButtons from '../../../layout/historyButtons.js';
import ws from '../../../sanWs.js';

await ws.connect();

localStorage.clear();

openingsName.modal.show();
