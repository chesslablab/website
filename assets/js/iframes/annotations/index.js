import { binaryWebSocket } from '../../websockets/BinaryWebSocket.js';
import { analysisWebSocket } from '../../websockets/game/AnalysisWebSocket.js';

try {
  await Promise.all([
    binaryWebSocket.connect(),
    analysisWebSocket.connect()
  ]);
} catch {}

const url = window.location.href.split('/');

analysisWebSocket.send('/play_rav', {
  variant: url[6],
  fen: decodeURIComponent(url[7]),
  movetext: decodeURIComponent(url[8]),
  startPos: url[9]
});
