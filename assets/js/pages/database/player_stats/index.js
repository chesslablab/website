import { playerStatsModal } from './PlayerStatsModal.js';
import { dataWebSocket } from '../../../websockets/data/DataWebSocket.js';
import { analysisWebSocket } from '../../../websockets/game/AnalysisWebSocket.js';

sessionStorage.clear();

await dataWebSocket.connect();

await analysisWebSocket.connect();

playerStatsModal.props.modal.show();
