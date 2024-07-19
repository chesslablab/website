import Modal from 'bootstrap/js/dist/modal.js';
import { Chessboard, BORDER_TYPE, FEN } from '@chesslablab/chessboard';
import { ChessboardEditor } from '@chesslablab/js-utils';

const chessboardEditor = new ChessboardEditor(
  document.querySelector('#chessboardEditor'),
  {
    chessboard: new Chessboard(
      document.getElementById('chessboard'),
      {
        assetsUrl: "https://cdn.jsdelivr.net/npm/@chesslablab/chessboard@0.0.4/assets/",
        position: FEN.start,
        style: {
          borderType: BORDER_TYPE.thin,
          ...(localStorage.getItem('set') === 'staunty') && {pieces: {file: "pieces/staunty.svg"}},
        }
      }
    ),
    modal: new Modal(document.getElementById('chessboardEditorModal')),
    pieces: document.querySelector('#chessboardEditorModal .modal-body .pieces'),
    pieceButtons: document.querySelector('#chessboardEditorModal .modal-body .buttons'),
    sq: '',
    form: document.querySelector('#chessboardEditor form'),
    editButtons: document.querySelector('#chessboardEditor form .buttons'),
  }
);

export default chessboardEditor;
