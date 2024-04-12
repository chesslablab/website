import { searchGamesModal } from './SearchGamesModal.js';
import boardActionsDropdown from '../../boardActionsDropdown.js';
import { gameStudyDropdown } from '../../GameStudyDropdown.js';
import historyButtons from '../../historyButtons.js';
import { blackAutocomplete } from '../../BlackAutocomplete.js';
import { whiteAutocomplete } from '../../WhiteAutocomplete.js';
import { eventAutocomplete } from '../../EventAutocomplete.js';
import { sanWebSocket } from '../../../SanWebSocket.js';

await sanWebSocket.connect();

sessionStorage.clear();

searchGamesModal.props.modal.show();
