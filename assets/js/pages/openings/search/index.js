import { openingsSearchModal } from './OpeningsSearchModal.js';
import { binaryWebSocket } from '../../../websockets/binary/BinaryWebSocket.js';
import { analysisWebSocket } from '../../../websockets/game/AnalysisWebSocket.js';

sessionStorage.clear();

try {
  await binaryWebSocket.connect();
} catch {}

try {
  await analysisWebSocket.connect();
} catch {}

openingsSearchModal.props.modal.show();
