import { checkmateModal } from './CheckmateModal.js';
import { stockfishWebSocket } from '../../../StockfishWebSocket.js';

await stockfishWebSocket.connect();

sessionStorage.clear();

checkmateModal.props.modal.show();
