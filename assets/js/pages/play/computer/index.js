import { ws, playComputer } from '../../../layout/stockfish/init.js';

await ws.connect();

playComputer.modal.show();
