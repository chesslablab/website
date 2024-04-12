import { createGameModal } from './CreateGameModal.js';
import { enterInviteCodeModal } from './EnterInviteCodeModal.js';
import { friendButtons } from './FriendButtons.js';
import { playerButtons } from './PlayerButtons.js';
import { playFriendModal } from './PlayFriendModal.js';
import boardActionsDropdown from '../../boardActionsDropdown.js';
import chessboard from '../../chessboard.js';
import historyButtons from '../../historyButtons.js';
import { settingsModal } from '../../SettingsModal.js';
import { playWebSocket } from '../../../PlayWebSocket.js';

sessionStorage.clear();

chessboard.state.inputWhiteEnabled = false;
chessboard.state.inputBlackEnabled = false;

await playWebSocket.connect();

playWebSocket.send('/online_games');
