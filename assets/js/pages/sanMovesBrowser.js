import { FEN } from '@chesslablab/chessboard';
import { SanMovesFactory } from '@chesslablab/js-utils';
import chessboard from './chessboard.js';

const sanMovesBrowser = SanMovesFactory.create(localStorage.getItem('format'), {
  el: document.querySelector('#movesBrowser'),
  props() {
    return({
      chessboard: chessboard,
      movetext: '',
      fen: [
        FEN.start
      ]
    });
  }
});

export default sanMovesBrowser;
