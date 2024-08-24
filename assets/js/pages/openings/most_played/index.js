import { resultModal } from './ResultModal.js';
import { binaryWebSocket } from '../../../websockets/binary/BinaryWebSocket.js';
import { dataWebSocket } from '../../../websockets/data/DataWebSocket.js';
import { analysisWebSocket } from '../../../websockets/game/AnalysisWebSocket.js';

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

dataWebSocket
  .send(`/result`)
  .onChange('/result', data => {
    resultModal.props.result = data;
    resultModal.mount();
    resultModal.props.modal.show();
  });
