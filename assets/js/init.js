import {
  GameActionsDropdown,
  HistoryButtons,
  OpeningTable,
  SanMovesTable
} from "https://cdn.jsdelivr.net/npm/@chesslablab/jsblab@0.0.9/src/index.min.js";
import { INPUT_EVENT_TYPE, COLOR, Chessboard, BORDER_TYPE } from "cm-chessboard";
import { Accessibility } from "../vendor/cm-chessboard/src/extensions/accessibility/Accessibility.js";
import { MARKER_TYPE, Markers } from "../vendor/cm-chessboard/src/extensions/markers/Markers.js";
import { FEN } from "../vendor/cm-chessboard/src/model/Position.js";
import { PromotionDialog } from "../vendor/cm-chessboard/src/extensions/promotion-dialog/PromotionDialog.js";
import ChesslaBlabWebSocket from './ChesslaBlabWebSocket.js';

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
    sanMovesTable: sanMovesTable
  }
);

const openingTable = new OpeningTable(
  document.querySelector('#openingTable tbody'),
  {
    sanMovesTable: sanMovesTable
  }
);

const startedButtons = document.getElementById('startedButtons');

const gameActionsDropdown = new GameActionsDropdown(
  document.querySelector('#gameActionsDropdown ul'),
  {
    chessboard: chessboard,
    sanMovesTable: sanMovesTable
  }
);

export const ws = new ChesslaBlabWebSocket(
  chessboard,
  sanMovesTable,
  openingTable,
  startedButtons,
  gameActionsDropdown
);
