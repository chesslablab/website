import { endgameModal } from './EndgameModal.js';
import { binaryWebSocket } from '../../../websockets/binary/BinaryWebSocket.js';
import { stockfishWebSocket } from '../../../websockets/game/StockfishWebSocket.js';

try {
  await Promise.all([
    binaryWebSocket.connect(),
    stockfishWebSocket.connect()
  ]);
} catch {}

endgameModal.props.modal.show();
