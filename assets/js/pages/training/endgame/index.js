import { endgameModal } from './EndgameModal.js';
import { stockfishWebSocket } from '../../../StockfishWebSocket.js';

await stockfishWebSocket.connect();

sessionStorage.clear();

endgameModal.props.modal.show();
