import { analysisWebSocket } from '../../websockets/game/AnalysisWebSocket.js';
import * as mode from '../../../mode.js';

sessionStorage.clear();

await analysisWebSocket.connect();

const url = window.location.href.split('/');
const variant = url[6];
const settings = {
  fen: decodeURIComponent(url[7]),
  movetext: decodeURIComponent(url[8]),
  startPos: url[9]
};

analysisWebSocket.send(`/start ${variant} ${mode.ANALYSIS} "${JSON.stringify(settings).replace(/"/g, '\\"')}"`);
