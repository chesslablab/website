import { createGameModal } from './CreateGameModal.js';
import { enterInviteCodeModal } from './EnterInviteCodeModal.js';
import { friendButtons } from './FriendButtons.js';
import { playerButtons } from './PlayerButtons.js';
import { playFriendModal } from './PlayFriendModal.js';
import boardActionsDropdown from '../../boardActionsDropdown.js';
import chessboard from '../../chessboard.js';
import historyButtons from '../../historyButtons.js';
import ws from '../../../playWs.js';

localStorage.clear();

chessboard.state.inputWhiteEnabled = false;
chessboard.state.inputBlackEnabled = false;

await ws.connect();

ws.send('/online_games');
