import ws from '../../../layout/play/ws.js';
import chessboard from '../../../layout/chessboard.js';

chessboard.state.inputWhiteEnabled = false;
chessboard.state.inputBlackEnabled = false;

await ws.connect();

ws.send('/online_games');
