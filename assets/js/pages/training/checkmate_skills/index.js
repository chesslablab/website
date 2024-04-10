import boardActionsDropdown from '../../boardActionsDropdown.js';
import { gameStudyDropdown } from '../../GameStudyDropdown.js';
import historyButtons from '../../historyButtons.js';
import { checkmateSkillsModal } from './CheckmateSkillsModal.js';
import { stockfishWebSocket } from '../../../StockfishWebSocket.js';

await stockfishWebSocket.connect();

localStorage.clear();

checkmateSkillsModal.props.modal.show();
