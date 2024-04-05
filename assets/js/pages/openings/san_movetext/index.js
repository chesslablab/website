import boardActionsDropdown from '../../../elements/boardActionsDropdown.js';
import gameStudyDropdown from '../../../elements/gameStudyDropdown.js';
import historyButtons from '../../../elements/historyButtons.js';
import openingsSanMovetextModal from '../../../elements/openingsSanMovetextModal.js';
import ws from '../../../sanWs.js';

await ws.connect();

localStorage.clear();

openingsSanMovetextModal.props.modal.show();
