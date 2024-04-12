import { checkmateModal } from './CheckmateModal.js';
import boardActionsDropdown from '../../boardActionsDropdown.js';
import historyButtons from '../../historyButtons.js';
import { settingsModal } from '../../SettingsModal.js';
import { stockfishWebSocket } from '../../../StockfishWebSocket.js';

await stockfishWebSocket.connect();

sessionStorage.clear();

checkmateModal.props.modal.show();
