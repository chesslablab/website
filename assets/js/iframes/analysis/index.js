import { binaryWebSocket } from '../../websockets/binary/BinaryWebSocket.js';
import { analysisWebSocket } from '../../websockets/game/AnalysisWebSocket.js';
import * as mode from '../../../mode.js';

sessionStorage.clear();

try {
  await binaryWebSocket.connect();
} catch {}

try {
  await analysisWebSocket.connect();
} catch {}

const url = window.location.href.split('/');
const variant = url[6];

analysisWebSocket.send('/start', {
  variant: variant,
  mode: mode.ANALYSIS,
  settings: {
    fen: decodeURIComponent(url[7]),
    movetext: decodeURIComponent(url[8]),
    startPos: url[9]
  }
});
