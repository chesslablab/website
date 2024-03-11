import {
  INPUT_EVENT_TYPE,
  COLOR,
  Chessboard,
  BORDER_TYPE,
  Accessibility,
  MARKER_TYPE,
  Markers,
  FEN,
  PromotionDialog
} from '@chesslablab/cmblab';
import {
  GameActionsDropdown,
  HistoryButtons,
  OpeningTable,
  SanMovesTable
} from '@chesslablab/jsblab';
import Modal from 'bootstrap/js/dist/modal.js';
import ChesslaBlabWebSocket from '../../ws/fen.js';

const inputHandler = (event) => {
  if (event.type === INPUT_EVENT_TYPE.movingOverSquare) {
    return;
  }

  if (event.type !== INPUT_EVENT_TYPE.moveInputFinished) {
    event.chessboard.removeMarkers(MARKER_TYPE.dot);
    event.chessboard.removeMarkers(MARKER_TYPE.bevel);
  }

  if (event.type === INPUT_EVENT_TYPE.moveInputStarted) {
    ws.send(`/legal ${event.square}`);
    return true;
  } else if (event.type === INPUT_EVENT_TYPE.validateMoveInput) {
    ws.send(`/play_lan ${event.piece.charAt(0)} ${event.squareFrom}${event.squareTo}`);
    return true;
  }
}

const chessboard = new Chessboard(
  document.getElementById("chessboard"),
  {
    position: FEN.start,
    assetsUrl: "https://cdn.jsdelivr.net/npm/cm-chessboard@8.5.0/assets/",
    style: {borderType: BORDER_TYPE.none, pieces: {file: "pieces/staunty.svg"}, animationDuration: 300},
    orientation: COLOR.white,
    extensions: [
      {class: Markers, props: {autoMarkers: MARKER_TYPE.square}},
      {class: PromotionDialog},
      {class: Accessibility, props: {visuallyHidden: true}}
    ]
  }
);

chessboard.enableMoveInput(inputHandler);

const sanMovesTable = new SanMovesTable(
  document.querySelector('#sanMovesTable tbody'),
  {
    chessboard: chessboard,
    inputHandler: inputHandler,
    movetext: '',
    fen: [
      FEN.start
    ]
  }
);

const historyButtons = new HistoryButtons(
  document.querySelector('#historyButtons'),
  {
    movesTable: sanMovesTable
  }
);

const openingTable = new OpeningTable(
  document.querySelector('#openingTable tbody'),
  {
    movetext: sanMovesTable.props.movetext
  }
);

const startedButtons = document.getElementById('startedButtons');

const gameActionsDropdown = new GameActionsDropdown(
  document.querySelector('#gameActionsDropdown ul'),
  {
    movesTable: sanMovesTable
  }
);

export const ws = new ChesslaBlabWebSocket(
  chessboard,
  sanMovesTable,
  openingTable,
  startedButtons,
  gameActionsDropdown
);

export const chessboardFenString = {
  modal: new Modal(document.getElementById('chessboardFenStringModal')),
  form: document.querySelector('#chessboardFenStringModal form')
}

export * from '../init.js';
