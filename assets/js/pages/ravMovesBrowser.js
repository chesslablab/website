import { FEN } from '@chesslablab/chessboard';
import { RavMovesFactory } from '@chesslablab/js-utils';
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
