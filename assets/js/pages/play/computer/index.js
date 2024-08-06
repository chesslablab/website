import { playComputerModal } from './PlayComputerModal.js';
import { stockfishWebSocket } from '../../../websockets/game/StockfishWebSocket.js';

await stockfishWebSocket.connect();

sessionStorage.clear();

playComputerModal.props.modal.show();
