import { fenWebSocket } from '../../../FenWebSocket.js';

await fenWebSocket.connect();

sessionStorage.clear();

fenWebSocket.send('/start losing fen');
