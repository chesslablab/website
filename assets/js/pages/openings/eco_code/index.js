import gameStudyDropdown from '../../../elements/gameStudyDropdown.js';
import openingsEcoCodeModal from '../../../elements/openingsEcoCodeModal.js';
import boardActionsDropdown from '../../../pages/boardActionsDropdown.js';
import historyButtons from '../../../pages/historyButtons.js';
import ws from '../../../sanWs.js';

await ws.connect();

localStorage.clear();

openingsEcoCodeModal.props.modal.show();
