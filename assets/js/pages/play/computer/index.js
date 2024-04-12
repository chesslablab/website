import { playComputerModal } from './PlayComputerModal.js';
import boardActionsDropdown from '../../boardActionsDropdown.js';
import historyButtons from '../../historyButtons.js';
import { settingsModal } from '../../SettingsModal.js';
import { stockfishWebSocket } from '../../../StockfishWebSocket.js';

await stockfishWebSocket.connect();

sessionStorage.clear();

playComputerModal.props.modal.show();
