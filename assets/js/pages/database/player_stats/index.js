import blackAutocomplete from '../../../elements/blackAutocomplete.js';
import boardActionsDropdown from '../../../elements/boardActionsDropdown.js';
import gameStudyDropdown from '../../../elements/gameStudyDropdown.js';
import historyButtons from '../../../elements/historyButtons.js';
import playerStatsModal from '../../../elements/playerStatsModal.js';
import whiteAutocomplete from '../../../elements/whiteAutocomplete.js';
import ws from '../../../sanWs.js';

await ws.connect();

localStorage.clear();

playerStatsModal.props.modal.show();
