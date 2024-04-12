import { searchGamesModal } from './SearchGamesModal.js';
import { blackAutocomplete } from '../../BlackAutocomplete.js';
import boardActionsDropdown from '../../boardActionsDropdown.js';
import { eventAutocomplete } from '../../EventAutocomplete.js';
import { gameStudyDropdown } from '../../GameStudyDropdown.js';
import historyButtons from '../../historyButtons.js';
import { settingsModal } from '../../SettingsModal.js';
import { whiteAutocomplete } from '../../WhiteAutocomplete.js';
import { sanWebSocket } from '../../../SanWebSocket.js';

await sanWebSocket.connect();

sessionStorage.clear();

searchGamesModal.props.modal.show();
