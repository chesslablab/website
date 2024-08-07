import { FEN } from '@chesslablab/chessboard';
import { SanMovesFactory } from '@chesslablab/js-utils';
import chessboard from './chessboard.js';

const sanMovesBrowser = SanMovesFactory.create(
  localStorage.getItem('format'),
  document.querySelector('#movesBrowser'),
  {
    chessboard: chessboard,
    movetext: '',
    fen: [
      FEN.start
    ]
  }
);

export default sanMovesBrowser;
