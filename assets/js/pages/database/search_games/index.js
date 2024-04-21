import { searchGamesModal } from './SearchGamesModal.js';
import { sanWebSocket } from '../../../SanWebSocket.js';

await sanWebSocket.connect();

sessionStorage.clear();

searchGamesModal.props.modal.show();
