import boardActionsDropdown from '../../../elements/boardActionsDropdown.js';
import eventStatsModal from '../../../elements/eventStatsModal.js';
import gameStudyDropdown from '../../../elements/gameStudyDropdown.js';
import historyButtons from '../../../elements/historyButtons.js';
import { eventAutocomplete } from '../../../pages/EventAutocomplete.js';
import ws from '../../../sanWs.js';

await ws.connect();

localStorage.clear();

eventStatsModal.props.modal.show();
