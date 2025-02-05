import { openingsForm } from './OpeningsForm.js';
import { mostPlayedForm } from './MostPlayedForm.js';
import { binaryWebSocket } from '../../websockets/BinaryWebSocket.js';
import { dataWebSocket } from '../../websockets/DataWebSocket.js';
import { analysisWebSocket } from '../../websockets/game/AnalysisWebSocket.js';
import * as mode from '../../../mode.js';
import * as variant from '../../../variant.js';

try {
  await Promise.all([
    binaryWebSocket.connect(),
    dataWebSocket.connect(),
    analysisWebSocket.connect()
  ]);
} catch {}

analysisWebSocket.send('/start', {
  variant: variant.CLASSICAL,
  mode: mode.ANALYSIS
});
