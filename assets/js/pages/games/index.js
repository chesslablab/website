import { searchGamesModal } from './SearchGamesModal.js';
import { binaryWebSocket } from '../../websockets/binary/BinaryWebSocket.js';
import { dataWebSocket } from '../../websockets/data/DataWebSocket.js';
import { analysisWebSocket } from '../../websockets/game/AnalysisWebSocket.js';

try {
  await Promise.all([
    binaryWebSocket.connect(),
    dataWebSocket.connect(),
    analysisWebSocket.connect()
  ]);
} catch {}

searchGamesModal.props.modal.show();
