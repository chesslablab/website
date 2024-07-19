import { eventStatsModal } from './EventStatsModal.js';
import { sanWebSocket } from '../../../AnalysisWebSocket.js';

await sanWebSocket.connect();

sessionStorage.clear();

eventStatsModal.props.modal.show();
