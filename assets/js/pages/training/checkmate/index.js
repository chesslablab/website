import { checkmateModal } from './CheckmateModal.js';
import { stockfishWebSocket } from '../../../websockets/game/StockfishWebSocket.js';

await stockfishWebSocket.connect();

sessionStorage.clear();

checkmateModal.props.modal.show();
