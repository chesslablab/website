import openingsEcoCode from './openingsEcoCode.js';
import gameActionsDropdown from '../../../layout/gameActionsDropdown.js';
import gameStudyDropdown from '../../../layout/gameStudyDropdown.js';
import ws from '../../../layout/san/ws.js';

await ws.connect();

localStorage.clear();

openingsEcoCode.modal.show();
