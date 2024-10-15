import { checkmateModal } from './CheckmateModal.js';
import { binaryWebSocket } from '../../../websockets/binary/BinaryWebSocket.js';
import { stockfishWebSocket } from '../../../websockets/game/StockfishWebSocket.js';

sessionStorage.clear();

try {
  await Promise.all([
    binaryWebSocket.connect(),
    stockfishWebSocket.connect()
  ]);
} catch {}

checkmateModal.props.modal.show();
