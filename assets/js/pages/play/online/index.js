import createGameModal from '../../../elements/createGameModal.js';
import enterInviteCodeModal from '../../../elements/enterInviteCodeModal.js';
import friendButtons from '../../../elements/friendButtons.js';
import playerButtons from '../../../elements/playerButtons.js';
import playFriendModal from '../../../elements/playFriendModal.js';
import boardActionsDropdown from '../../../pages/boardActionsDropdown.js';
import chessboard from '../../../pages/chessboard.js';
import historyButtons from '../../../pages/historyButtons.js';
import ws from '../../../playWs.js';

localStorage.clear();

chessboard.state.inputWhiteEnabled = false;
chessboard.state.inputBlackEnabled = false;

await ws.connect();

ws.send('/online_games');
