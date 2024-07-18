import { fenWebSocket } from '../../../FenWebSocket.js';

await fenWebSocket.connect();

sessionStorage.clear();

fenWebSocket.send('/start classical fen');
