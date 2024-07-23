import { analysisWebSocket } from '../../AnalysisWebSocket.js';
import * as mode from '../../../mode.js';

const variant = document.getElementById('analysis').dataset.variant;
const fen = document.getElementById('analysis').dataset.fen;
const movetext = document.getElementById('analysis').dataset.movetext;
const startPos = document.getElementById('analysis').dataset.startpos;

const settings = {
  fen: fen
};

await analysisWebSocket.connect();

sessionStorage.clear();

analysisWebSocket.send(`/start ${variant} ${mode.ANALYSIS} "${JSON.stringify(settings).replace(/"/g, '\\"')}"`);
