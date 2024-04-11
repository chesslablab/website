import { checkmateModal } from './CheckmateModal.js';
import boardActionsDropdown from '../../boardActionsDropdown.js';
import historyButtons from '../../historyButtons.js';
import { stockfishWebSocket } from '../../../StockfishWebSocket.js';

await stockfishWebSocket.connect();

localStorage.clear();

checkmateModal.props.modal.show();
