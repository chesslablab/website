import boardActionsDropdown from '../../../elements/boardActionsDropdown.js';
import gameStudyDropdown from '../../../elements/gameStudyDropdown.js';
import historyButtons from '../../../elements/historyButtons.js';
import openingsNameModal from '../../../elements/openingsNameModal.js';
import ws from '../../../sanWs.js';

await ws.connect();

localStorage.clear();

openingsNameModal.props.modal.show();
