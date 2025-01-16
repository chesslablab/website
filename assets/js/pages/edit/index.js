import Modal from 'bootstrap/js/dist/modal.js';
import { Chessboard, BORDER_TYPE, FEN } from '@chesslablab/chessboard';
import { ChessboardEditor } from '@chesslablab/js-utils';

const chessboardEditor = new ChessboardEditor({
  el: document.querySelector('#chessboardEditor'),
  props() {
    return({
      chessboard: new Chessboard(
        document.querySelector('#chessboard'),
        {
          assetsUrl: "https://cdn.jsdelivr.net/npm/@chesslablab/chessboard@0.0.4/assets/",
          position: FEN.start,
          style: {
            borderType: BORDER_TYPE.thin,
            ...(localStorage.getItem('set') === 'staunty') && {pieces: {file: "pieces/staunty.svg"}},
          }
        }
      ),
      modal: new Modal(this.el.querySelector('.modal')),
      pieces: this.el.querySelector('.modal-body .pieces'),
      pieceButtons: this.el.querySelector('.modal-body .buttons'),
      sq: '',
      form: this.el.querySelector('form'),
      editButtons: this.el.querySelector('form .buttons')
    });
  }
});