import { eventStatsModal } from './EventStatsModal.js';
import { sanWebSocket } from '../../../SanWebSocket.js';

await sanWebSocket.connect();

sessionStorage.clear();

eventStatsModal.props.modal.show();
