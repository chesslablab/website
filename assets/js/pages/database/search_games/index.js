import { searchGamesModal } from './SearchGamesModal.js';
import { dataWebSocket } from '../../../websockets/data/DataWebSocket.js';
import { analysisWebSocket } from '../../../websockets/game/AnalysisWebSocket.js';

await analysisWebSocket.connect();

await dataWebSocket.connect();

sessionStorage.clear();

searchGamesModal.props.modal.show();
