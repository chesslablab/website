import playComputer from '../../../layout/mode/stockfish/playComputer.js';
import ws from '../../../layout/mode/stockfish/ws.js';

await ws.connect();

playComputer.modal.show();
