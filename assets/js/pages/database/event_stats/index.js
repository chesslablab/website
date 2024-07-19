import { eventStatsModal } from './EventStatsModal.js';
import { analysisWebSocket } from '../../../AnalysisWebSocket.js';

await analysisWebSocket.connect();

sessionStorage.clear();

eventStatsModal.props.modal.show();
