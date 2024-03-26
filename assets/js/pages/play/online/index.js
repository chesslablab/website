import copyInviteCodeModal from './copyInviteCodeModal.js';
import createGameModal from './createGameModal.js';
import drawModal from './drawModal.js';
import enterInviteCodeModal from './enterInviteCodeModal.js';
import friendButtons from './friendButtons.js';
import onlinePlayersCard from './onlinePlayersCard.js';
import playFriendModal from './playFriendModal.js';
import rematchModal from './rematchModal.js';
import takebackModal from './takebackModal.js';
import ws from '../../../playWs.js';
import chessboard from '../../../pages/chessboard.js';
import boardActionsDropdown from '../../../pages/boardActionsDropdown.js';
import historyButtons from '../../../pages/historyButtons.js';
import infoModal from '../../../pages/infoModal.js';
import startedButtons from '../../../pages/startedButtons.js';

localStorage.clear();

chessboard.state.inputWhiteEnabled = false;
chessboard.state.inputBlackEnabled = false;

await ws.connect();

ws.send('/online_games');
