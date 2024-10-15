import { openingsSearchModal } from './OpeningsSearchModal.js';
import { binaryWebSocket } from '../../../websockets/binary/BinaryWebSocket.js';
import { analysisWebSocket } from '../../../websockets/game/AnalysisWebSocket.js';

sessionStorage.clear();

try {
  await Promise.all([
  	binaryWebSocket.connect(),
  	analysisWebSocket.connect()
  ]);
} catch {}

openingsSearchModal.props.modal.show();
