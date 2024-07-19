import { playerStatsModal } from './PlayerStatsModal.js';
import { analysisWebSocket } from '../../../AnalysisWebSocket.js';

await analysisWebSocket.connect();

sessionStorage.clear();

playerStatsModal.props.modal.show();
