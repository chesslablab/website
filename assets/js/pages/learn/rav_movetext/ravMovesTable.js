import { RavMovesTable } from '@chesslablab/jsblab';
import { FEN } from '@chesslablab/cmblab';
import chessboard from '../../../elements/chessboard.js';

const ravMovesTable = new RavMovesTable(
  document.querySelector('#ravMovesTable tbody'),
  {
    chessboard: chessboard,
    filtered: '',
    breakdown: [
      ''
    ],
    fen: [
      FEN.start
    ]
  }
);

export default ravMovesTable;
