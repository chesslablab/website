import boardActionsDropdown from '../../../elements/boardActionsDropdown.js';
import eventAutocomplete from '../../../elements/eventAutocomplete.js';
import eventStatsModal from '../../../elements/eventStatsModal.js';
import gameStudyDropdown from '../../../elements/gameStudyDropdown.js';
import historyButtons from '../../../elements/historyButtons.js';
import ws from '../../../sanWs.js';

await ws.connect();

localStorage.clear();

eventStatsModal.props.modal.show();
