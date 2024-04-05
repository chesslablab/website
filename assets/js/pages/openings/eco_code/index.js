import boardActionsDropdown from '../../../elements/boardActionsDropdown.js';
import gameStudyDropdown from '../../../elements/gameStudyDropdown.js';
import historyButtons from '../../../elements/historyButtons.js';
import openingsEcoCodeModal from '../../../elements/openingsEcoCodeModal.js';
import ws from '../../../sanWs.js';

await ws.connect();

localStorage.clear();

openingsEcoCodeModal.props.modal.show();
