import { playerStatsModal } from './PlayerStatsModal.js';
import { blackAutocomplete } from '../../BlackAutocomplete.js';
import { whiteAutocomplete } from '../../WhiteAutocomplete.js';
import boardActionsDropdown from '../../boardActionsDropdown.js';
import { gameStudyDropdown } from '../../GameStudyDropdown.js';
import historyButtons from '../../historyButtons.js';
import ws from '../../../sanWs.js';

await ws.connect();

localStorage.clear();

playerStatsModal.props.modal.show();
