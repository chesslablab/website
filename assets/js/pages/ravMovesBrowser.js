import { FEN } from '@chesslablab/cmblab';
import { RavMovesFactory } from '@chesslablab/jsblab';
import chessboard from './chessboard.js';

const ravMovesBrowser = RavMovesFactory.create(
  localStorage.getItem('format'),
  document.querySelector('#movesBrowser'),
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

export default ravMovesBrowser;
