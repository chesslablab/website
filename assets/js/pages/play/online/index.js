import { createGameModal } from './CreateGameModal.js';
import { playFriendModal } from './PlayFriendModal.js';
import chessboard from '../../chessboard.js';
import { playWebSocket } from '../../../websockets/game/PlayWebSocket.js';

sessionStorage.clear();

chessboard.state.inputWhiteEnabled = false;
chessboard.state.inputBlackEnabled = false;

await playWebSocket.connect();

playWebSocket.send('/online_games');
