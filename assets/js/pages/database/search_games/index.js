import { searchGamesModal } from './SearchGamesModal.js';
import { analysisWebSocket } from '../../../websockets/game/AnalysisWebSocket.js';

await analysisWebSocket.connect();

sessionStorage.clear();

searchGamesModal.props.modal.show();
