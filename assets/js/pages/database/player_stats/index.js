import { playerStatsModal } from './PlayerStatsModal.js';
import { sanWebSocket } from '../../../SanWebSocket.js';

await sanWebSocket.connect();

sessionStorage.clear();

playerStatsModal.props.modal.show();
