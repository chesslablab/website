import { eventStatsModal } from './EventStatsModal.js';
import boardActionsDropdown from '../../boardActionsDropdown.js';
import { gameStudyDropdown } from '../../GameStudyDropdown.js';
import historyButtons from '../../historyButtons.js';
import { eventAutocomplete } from '../../EventAutocomplete.js';
import { sanWebSocket } from '../../../SanWebSocket.js';

await sanWebSocket.connect();

localStorage.clear();

eventStatsModal.props.modal.show();
