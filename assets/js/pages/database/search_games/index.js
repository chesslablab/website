import { searchGamesModal } from './SearchGamesModal.js';
import { blackAutocomplete } from '../../BlackAutocomplete.js';
import { eventAutocomplete } from '../../EventAutocomplete.js';
import { whiteAutocomplete } from '../../WhiteAutocomplete.js';
import { sanWebSocket } from '../../../SanWebSocket.js';

await sanWebSocket.connect();

sessionStorage.clear();

searchGamesModal.props.modal.show();
