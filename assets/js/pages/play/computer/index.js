import playComputer from '../../../layout/stockfish/playComputer.js';
import ws from '../../../layout/stockfish/ws.js';

await ws.connect();

playComputer.modal.show();
