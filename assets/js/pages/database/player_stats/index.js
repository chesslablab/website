import { blackAutocomplete } from '../../../pages/BlackAutocomplete.js';
import { whiteAutocomplete } from '../../../pages/WhiteAutocomplete.js';
import boardActionsDropdown from '../../../elements/boardActionsDropdown.js';
import gameStudyDropdown from '../../../elements/gameStudyDropdown.js';
import historyButtons from '../../../elements/historyButtons.js';
import playerStatsModal from '../../../elements/playerStatsModal.js';
import ws from '../../../sanWs.js';

await ws.connect();

localStorage.clear();

playerStatsModal.props.modal.show();
