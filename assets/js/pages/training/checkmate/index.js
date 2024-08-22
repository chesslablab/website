import { checkmateModal } from './CheckmateModal.js';
import { binaryWebSocket } from '../../../websockets/binary/BinaryWebSocket.js';
import { stockfishWebSocket } from '../../../websockets/game/StockfishWebSocket.js';

sessionStorage.clear();

await binaryWebSocket.connect();
await stockfishWebSocket.connect();

checkmateModal.props.modal.show();
