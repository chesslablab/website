import { FEN } from '@chesslablab/chessboard';
import { gameForm } from './GameForm.js';
import { sanWebSocket } from '../../../SanWebSocket.js';

await sanWebSocket.connect();

sessionStorage.clear();

sanWebSocket.send(`/start classical san`);
