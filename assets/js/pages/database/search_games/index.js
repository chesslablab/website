import { searchGamesModal } from './SearchGamesModal.js';
import { dataWebSocket } from '../../../websockets/data/DataWebSocket.js';
import { analysisWebSocket } from '../../../websockets/game/AnalysisWebSocket.js';

sessionStorage.clear();

await dataWebSocket.connect();

await analysisWebSocket.connect();

searchGamesModal.props.modal.show();
