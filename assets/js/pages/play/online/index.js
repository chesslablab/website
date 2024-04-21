import { createGameModal } from './CreateGameModal.js';
import { enterInviteCodeModal } from './EnterInviteCodeModal.js';
import { playFriendModal } from './PlayFriendModal.js';
import { playOnlineButtons } from './PlayOnlineButtons.js';
import { playPanel } from './PlayPanel.js';
import chessboard from '../../chessboard.js';
import { playWebSocket } from '../../../PlayWebSocket.js';

sessionStorage.clear();

chessboard.state.inputWhiteEnabled = false;
chessboard.state.inputBlackEnabled = false;

await playWebSocket.connect();

playWebSocket.send('/online_games');
