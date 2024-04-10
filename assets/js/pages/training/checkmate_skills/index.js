import { checkmateSkillsModal } from './CheckmateSkillsModal.js';
import boardActionsDropdown from '../../boardActionsDropdown.js';
import historyButtons from '../../historyButtons.js';
import { stockfishWebSocket } from '../../../StockfishWebSocket.js';

await stockfishWebSocket.connect();

localStorage.clear();

checkmateSkillsModal.props.modal.show();
