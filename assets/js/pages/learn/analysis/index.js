import { binaryWebSocket } from '../../../websockets/binary/BinaryWebSocket.js';
import { analysisWebSocket } from '../../../websockets/game/AnalysisWebSocket.js';
import * as mode from '../../../../mode.js';
import * as variant from '../../../../variant.js';

sessionStorage.clear();

try {
  await binaryWebSocket.connect();
} catch {}

try {
  await analysisWebSocket.connect();
} catch {}

const params = {
  variant: variant.CLASSICAL,
  mode: mode.ANALYSIS
};

analysisWebSocket.send(`/start "${JSON.stringify(params).replace(/"/g, '\\"')}"`);
