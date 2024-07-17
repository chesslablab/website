import {
  COLOR,
  Chessboard,
  BORDER_TYPE,
  Accessibility,
  MARKER_TYPE,
  Markers,
  FEN,
  PromotionDialog
} from '@chesslablab/chessboard';

const chessboard = new Chessboard(
  document.getElementById("chessboard"),
  {
    position: FEN.start,
    assetsUrl: "https://cdn.jsdelivr.net/npm/@chesslablab/chessboard@0.0.4/assets/",
    style: {
      borderType: BORDER_TYPE.thin,
      ...(localStorage.getItem('set') === 'staunty') && {pieces: {file: "pieces/staunty.svg"}},
    },
    orientation: COLOR.white,
    extensions: [
      {class: Markers, props: {autoMarkers: MARKER_TYPE.square}},
      {class: PromotionDialog},
      {class: Accessibility, props: {visuallyHidden: true}}
    ]
  }
);

chessboard.context.addEventListener('contextmenu', (event) => {
  event.preventDefault();
});

chessboard.context.addEventListener('mousedown', (event) => {
  if (event.button === 2) {
    const markerType = MARKER_TYPE.circlePrimary;
    const square = event.target.getAttribute('data-square');
    const markersOnSquare = chessboard.getMarkers(markerType, square);
    if (markersOnSquare.length > 0) {
      chessboard.removeMarkers(markerType, square);
    } else {
      chessboard.addMarker(markerType, square);
    }
  }
});

export default chessboard;
