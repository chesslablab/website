import { playerStatsModal } from './PlayerStatsModal.js';
import { analysisWebSocket } from '../../../websockets/game/AnalysisWebSocket.js';

sessionStorage.clear();

await analysisWebSocket.connect();

playerStatsModal.props.modal.show();
