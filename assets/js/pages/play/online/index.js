import copyInviteCodeModal from './copyInviteCodeModal.js';
import createGameModal from './createGameModal.js';
import enterInviteCodeModal from './enterInviteCodeModal.js';
import friendButtons from './friendButtons.js';
import playerButtons from './playerButtons.js';
import playFriendModal from './playFriendModal.js';
import boardActionsDropdown from '../../../pages/boardActionsDropdown.js';
import chessboard from '../../../pages/chessboard.js';
import historyButtons from '../../../pages/historyButtons.js';
import ws from '../../../playWs.js';

localStorage.clear();

chessboard.state.inputWhiteEnabled = false;
chessboard.state.inputBlackEnabled = false;

await ws.connect();

ws.send('/online_games');
