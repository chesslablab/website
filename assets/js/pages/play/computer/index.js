import { playComputerModal } from './PlayComputerModal.js';
import boardActionsDropdown from '../../boardActionsDropdown.js';
import historyButtons from '../../historyButtons.js';
import { stockfishWebSocket } from '../../../StockfishWebSocket.js';

await stockfishWebSocket.connect();

localStorage.clear();

playComputerModal.props.modal.show();
