import { playerStatsModal } from './PlayerStatsModal.js';
import { blackAutocomplete } from '../../BlackAutocomplete.js';
import { whiteAutocomplete } from '../../WhiteAutocomplete.js';
import boardActionsDropdown from '../../boardActionsDropdown.js';
import { gameStudyDropdown } from '../../GameStudyDropdown.js';
import historyButtons from '../../historyButtons.js';
import { sanWebSocket } from '../../../SanWebSocket.js';

await sanWebSocket.connect();

localStorage.clear();

playerStatsModal.props.modal.show();
