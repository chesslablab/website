import { searchGamesModal } from './SearchGamesModal.js';
import { sanWebSocket } from '../../../AnalysisWebSocket.js';

await sanWebSocket.connect();

sessionStorage.clear();

searchGamesModal.props.modal.show();
