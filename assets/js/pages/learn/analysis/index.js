import { FEN } from '@chesslablab/chessboard';
import { gameForm } from './GameForm.js';
import { analysisWebSocket } from '../../../websockets/game/AnalysisWebSocket.js';
import * as mode from '../../../../mode.js';

sessionStorage.clear();

await analysisWebSocket.connect();

analysisWebSocket.send(`/start classical ${mode.ANALYSIS}`);
