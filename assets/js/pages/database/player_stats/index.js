import { playerStatsModal } from './PlayerStatsModal.js';
import { analysisWebSocket } from '../../../websockets/game/AnalysisWebSocket.js';

await analysisWebSocket.connect();

sessionStorage.clear();

playerStatsModal.props.modal.show();
