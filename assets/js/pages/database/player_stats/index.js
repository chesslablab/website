import { playerStatsModal } from './PlayerStatsModal.js';
import { blackAutocomplete } from '../../BlackAutocomplete.js';
import { whiteAutocomplete } from '../../WhiteAutocomplete.js';
import { sanWebSocket } from '../../../SanWebSocket.js';

await sanWebSocket.connect();

sessionStorage.clear();

playerStatsModal.props.modal.show();
