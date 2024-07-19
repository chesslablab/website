import { FEN } from '@chesslablab/chessboard';
import { gameForm } from './GameForm.js';
import { analysisWebSocket } from '../../../AnalysisWebSocket.js';
import * as mode from '../../../../mode.js';

await analysisWebSocket.connect();

sessionStorage.clear();

analysisWebSocket.send(`/start classical ${mode.ANALYSIS}`);
