import { playerStatsModal } from './PlayerStatsModal.js';
import { sanWebSocket } from '../../../AnalysisWebSocket.js';

await sanWebSocket.connect();

sessionStorage.clear();

playerStatsModal.props.modal.show();
