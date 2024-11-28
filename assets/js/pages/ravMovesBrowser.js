import { FEN } from '@chesslablab/chessboard';
import { RavMovesFactory } from '@chesslablab/js-utils';
import chessboard from './chessboard.js';

const ravMovesBrowser = RavMovesFactory.create(localStorage.getItem('format'), {
  el: document.querySelector('#movesBrowser'),
  props() {
    return({
      chessboard: chessboard,
      filtered: '',
      breakdown: [
        ''
      ],
      fen: [
        FEN.start
      ]
    });
  }
});

export default ravMovesBrowser;
