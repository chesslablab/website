import { playComputerModal } from './PlayComputerModal.js';
import { binaryWebSocket } from '../../../websockets/binary/BinaryWebSocket.js';
import { stockfishWebSocket } from '../../../websockets/game/StockfishWebSocket.js';

sessionStorage.clear();

try {
  await binaryWebSocket.connect();
} catch {}

try {
  await stockfishWebSocket.connect();
} catch {}

playComputerModal.props.modal.show();
