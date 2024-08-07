import { eventStatsModal } from './EventStatsModal.js';
import { dataWebSocket } from '../../../websockets/data/DataWebSocket.js';
import { analysisWebSocket } from '../../../websockets/game/AnalysisWebSocket.js';

await analysisWebSocket.connect();

await dataWebSocket.connect();

sessionStorage.clear();

eventStatsModal.props.modal.show();
