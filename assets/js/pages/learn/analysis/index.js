import { FEN } from '@chesslablab/chessboard';
import { gameForm } from './GameForm.js';
import { analysisWebSocket } from '../../../AnalysisWebSocket.js';

await analysisWebSocket.connect();

sessionStorage.clear();

analysisWebSocket.send(`/start classical san`);
