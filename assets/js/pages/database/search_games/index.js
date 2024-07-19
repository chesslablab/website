import { searchGamesModal } from './SearchGamesModal.js';
import { analysisWebSocket } from '../../../AnalysisWebSocket.js';

await analysisWebSocket.connect();

sessionStorage.clear();

searchGamesModal.props.modal.show();
