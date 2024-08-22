import { binaryWebSocket } from '../../../websockets/binary/BinaryWebSocket.js';
import { analysisWebSocket } from '../../../websockets/game/AnalysisWebSocket.js';
import * as mode from '../../../../mode.js';

sessionStorage.clear();

await binaryWebSocket.connect();
await analysisWebSocket.connect();

analysisWebSocket.send(`/start classical ${mode.ANALYSIS}`);
