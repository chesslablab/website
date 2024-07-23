import '../../../vendor/bootstrap/dist/js/bootstrap.bundle.min.js';
import { analysisWebSocket } from '../../AnalysisWebSocket.js';
import * as mode from '../../../mode.js';

const url = window.location.href.split('/');

const variant = url[6];
const fen = url[7];

const settings = {
  fen: decodeURIComponent(fen)
};

await analysisWebSocket.connect();

sessionStorage.clear();

analysisWebSocket.send(`/start ${variant} ${mode.ANALYSIS} "${JSON.stringify(settings).replace(/"/g, '\\"')}"`);
