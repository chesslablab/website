import copyInviteCodeModal from './copyInviteCodeModal.js';
import createGameModal from './createGameModal.js';
import drawModal from './drawModal.js';
import enterInviteCodeModal from './enterInviteCodeModal.js';
import friendButtons from './friendButtons.js';
import onlineButtons from './onlineButtons.js';
import onlinePlayersTable from './onlinePlayersTable.js';
import playFriendModal from './playFriendModal.js';
import rematchModal from './rematchModal.js';
import takebackModal from './takebackModal.js';
import { timerTable, timerTableInterval } from './timerTable.js';
import ws from '../../../layout/play/ws.js';
import chessboard from '../../../layout/chessboard.js';
import gameActionsDropdown from '../../../layout/gameActionsDropdown.js';
import gameStudyDropdown from '../../../layout/gameStudyDropdown.js';
import historyButtons from '../../../layout/historyButtons.js';
import infoModal from '../../../layout/infoModal.js';
import startedButtons from '../../../layout/startedButtons.js';

localStorage.clear();

chessboard.state.inputWhiteEnabled = false;
chessboard.state.inputBlackEnabled = false;

await ws.connect();

ws.send('/online_games');
