import { FEN } from '@chesslablab/cmblab';
import { SanMovesTable } from '@chesslablab/jsblab';
import chessboard from './chessboard.js';

const sanMovesTable = new SanMovesTable(
  document.querySelector('#sanMovesTable tbody'),
  {
    chessboard: chessboard,
    movetext: '',
    fen: [
      FEN.start
    ]
  }
);

export default sanMovesTable;
