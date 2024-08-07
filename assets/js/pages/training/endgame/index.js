import { endgameModal } from './EndgameModal.js';
import { stockfishWebSocket } from '../../../websockets/game/StockfishWebSocket.js';

sessionStorage.clear();

await stockfishWebSocket.connect();

endgameModal.props.modal.show();
