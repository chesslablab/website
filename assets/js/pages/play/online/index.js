import { createGameModal } from './CreateGameModal.js';
import { playFriendModal } from './PlayFriendModal.js';
import chessboard from '../../chessboard.js';
import { binaryWebSocket } from '../../../websockets/binary/BinaryWebSocket.js';
import { dataWebSocket } from '../../../websockets/data/DataWebSocket.js';
import { playWebSocket } from '../../../websockets/game/PlayWebSocket.js';

sessionStorage.clear();

chessboard.state.inputWhiteEnabled = false;
chessboard.state.inputBlackEnabled = false;

try {
  await binaryWebSocket.connect();
} catch {}

try {
  await dataWebSocket.connect();
} catch {}

try {
  await playWebSocket.connect();
} catch {}

playWebSocket.send('/online_games');
