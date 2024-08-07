import { playComputerModal } from './PlayComputerModal.js';
import { stockfishWebSocket } from '../../../websockets/game/StockfishWebSocket.js';

sessionStorage.clear();

await stockfishWebSocket.connect();

playComputerModal.props.modal.show();
