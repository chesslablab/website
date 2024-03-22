import { BORDER_TYPE, Chessboard, FEN } from '@chesslablab/cmblab';

const chessboard = new Chessboard(
  document.getElementById('chessboard'),
  {
    assetsUrl: "https://cdn.jsdelivr.net/npm/cm-chessboard@8.5.0/assets/",
    position: FEN.start,
    style: {borderType: BORDER_TYPE.frame, pieces: {file: "pieces/staunty.svg"}}
  }
);

export default chessboard;
