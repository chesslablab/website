import { searchGamesModal } from './SearchGamesModal.js';
import { binaryWebSocket } from '../../websockets/binary/BinaryWebSocket.js';
import { dataWebSocket } from '../../websockets/data/DataWebSocket.js';
import { analysisWebSocket } from '../../websockets/game/AnalysisWebSocket.js';

sessionStorage.clear();

try {
  await binaryWebSocket.connect();
} catch {}

try {
  await dataWebSocket.connect();
} catch {}

try {
  await analysisWebSocket.connect();
} catch {}

searchGamesModal.props.modal.show();
