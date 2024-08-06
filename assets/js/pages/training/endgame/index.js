import { endgameModal } from './EndgameModal.js';
import { stockfishWebSocket } from '../../../websockets/game/StockfishWebSocket.js';

await stockfishWebSocket.connect();

sessionStorage.clear();

endgameModal.props.modal.show();
