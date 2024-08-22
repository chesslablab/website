import { playComputerModal } from './PlayComputerModal.js';
import { binaryWebSocket } from '../../../websockets/binary/BinaryWebSocket.js';
import { stockfishWebSocket } from '../../../websockets/game/StockfishWebSocket.js';

sessionStorage.clear();

await binaryWebSocket.connect();
await stockfishWebSocket.connect();

playComputerModal.props.modal.show();
