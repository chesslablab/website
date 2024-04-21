import { eventStatsModal } from './EventStatsModal.js';
import { eventAutocomplete } from '../../EventAutocomplete.js';
import { sanWebSocket } from '../../../SanWebSocket.js';

await sanWebSocket.connect();

sessionStorage.clear();

eventStatsModal.props.modal.show();
