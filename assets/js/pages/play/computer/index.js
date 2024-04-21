import { playComputerModal } from './PlayComputerModal.js';
import { stockfishWebSocket } from '../../../StockfishWebSocket.js';

await stockfishWebSocket.connect();

sessionStorage.clear();

playComputerModal.props.modal.show();
