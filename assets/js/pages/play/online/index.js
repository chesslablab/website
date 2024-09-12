import { createGameModal } from './CreateGameModal.js';
import { playFriendModal } from './PlayFriendModal.js';
import chessboard from '../../chessboard.js';
import { authWebSocket } from '../../../websockets/auth/AuthWebSocket.js';
import { binaryWebSocket } from '../../../websockets/binary/BinaryWebSocket.js';
import { playWebSocket } from '../../../websockets/game/PlayWebSocket.js';

sessionStorage.clear();

chessboard.state.inputWhiteEnabled = false;
chessboard.state.inputBlackEnabled = false;

try {
  await authWebSocket.connect();
} catch {}

try {
  await binaryWebSocket.connect();
} catch {}

try {
  await playWebSocket.connect();
} catch {}

playWebSocket.send('/online_games');
