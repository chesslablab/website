import {
  FEN,
  INPUT_EVENT_TYPE,
  MARKER_TYPE
} from '@chesslablab/cmblab';
import startedButtons from './startedButtons.js';
import chessboard from '../chessboard.js';
import gameActionsDropdown from '../gameActionsDropdown.js';
import openingTable from '../openingTable.js';
import sanMovesTable from '../sanMovesTable.js';
import ChesslaBlabWebSocket from '../../../ws/stockfish.js';

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

chessboard.disableMoveInput();
chessboard.enableMoveInput(inputHandler);

const ws = new ChesslaBlabWebSocket(
  chessboard,
  sanMovesTable,
  openingTable,
  startedButtons,
  gameActionsDropdown
);

export default ws;
