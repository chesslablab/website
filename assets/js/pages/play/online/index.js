import boardActionsDropdown from '../../../elements/boardActionsDropdown.js';
import chessboard from '../../../elements/chessboard.js';
import createGameModal from '../../../elements/createGameModal.js';
import enterInviteCodeModal from '../../../elements/enterInviteCodeModal.js';
import friendButtons from '../../../elements/friendButtons.js';
import historyButtons from '../../../elements/historyButtons.js';
import playerButtons from '../../../elements/playerButtons.js';
import playFriendModal from '../../../elements/playFriendModal.js';
import ws from '../../../playWs.js';

localStorage.clear();

chessboard.state.inputWhiteEnabled = false;
chessboard.state.inputBlackEnabled = false;

await ws.connect();

ws.send('/online_games');
