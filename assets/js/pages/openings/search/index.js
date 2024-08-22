import { openingsSearchModal } from './OpeningsSearchModal.js';
import { binaryWebSocket } from '../../../websockets/binary/BinaryWebSocket.js';
import { analysisWebSocket } from '../../../websockets/game/AnalysisWebSocket.js';

sessionStorage.clear();

await binaryWebSocket.connect();
await analysisWebSocket.connect();

openingsSearchModal.props.modal.show();
