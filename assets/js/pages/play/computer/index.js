import { ws, playComputer } from '../../../layout/mode/stockfish/init.js';

await ws.connect();

playComputer.modal.show();
