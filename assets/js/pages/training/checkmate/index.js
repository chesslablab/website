import { checkmateModal } from './CheckmateModal.js';
import { stockfishWebSocket } from '../../../websockets/game/StockfishWebSocket.js';

sessionStorage.clear();

await stockfishWebSocket.connect();

checkmateModal.props.modal.show();
