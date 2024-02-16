import {INPUT_EVENT_TYPE, COLOR, Chessboard, BORDER_TYPE} from "cm-chessboard"
import {Accessibility} from "../../../vendor/cm-chessboard/src/extensions/accessibility/Accessibility.js"
import {MARKER_TYPE, Markers} from "../../../vendor/cm-chessboard/src/extensions/markers/Markers.js"
import {PROMOTION_DIALOG_RESULT_TYPE, PromotionDialog} from "../../../vendor/cm-chessboard/src/extensions/promotion-dialog/PromotionDialog.js"
import {Chess} from "https://cdn.jsdelivr.net/npm/chess.mjs@1/src/chess.mjs/Chess.js"
import Ws from './Ws.js';

const inputHandler = async (event) => {
  if (event.type === INPUT_EVENT_TYPE.movingOverSquare) {
    return // ignore this event
  }

  if (event.type !== INPUT_EVENT_TYPE.moveInputFinished) {
    event.chessboard.removeMarkers(MARKER_TYPE.dot)
    event.chessboard.removeMarkers(MARKER_TYPE.bevel)
  }

  if (event.type === INPUT_EVENT_TYPE.moveInputStarted) {
    const moves = chess.moves({square: event.squareFrom, verbose: true})
    for (const move of moves) { // draw dots on possible squares
      if (move.promotion && move.promotion !== "q") {
        continue
      }
      if (event.chessboard.getPiece(move.to)) {
        event.chessboard.addMarker(MARKER_TYPE.bevel, move.to)
      } else {
        event.chessboard.addMarker(MARKER_TYPE.dot, move.to)
      }
    }
    return moves.length > 0
  } else if (event.type === INPUT_EVENT_TYPE.validateMoveInput) {
    const move = {from: event.squareFrom, to: event.squareTo, promotion: event.promotion}
    const result = chess.move(move)
    if (!result) {
      let possibleMoves = chess.moves({square: event.squareFrom, verbose: true})
      for (const possibleMove of possibleMoves) {
        if (possibleMove.promotion && possibleMove.to === event.squareTo) {
          event.chessboard.showPromotionDialog(event.squareTo, event.piece.charAt(0), async (result) => {
            if (result.type === PROMOTION_DIALOG_RESULT_TYPE.pieceSelected) {
              chess.move({from: event.squareFrom, to: event.squareTo, promotion: result.piece.charAt(1)})
            } else {
              chess.move({from: event.squareFrom, to: event.squareTo, promotion: 'q'})
            }
            event.chessboard.setPosition(chess.fen(), true)
            await ws.send(`/play_lan ${event.piece.charAt(0)} ${event.squareFrom}${event.squareTo}`)
          })
          return true
        }
      }
    } else {
      await ws.send(`/play_lan ${result.color} ${result.from}${result.to}`)
    }
    return result
  }
}

const chess = new Chess()

const board = new Chessboard(document.getElementById("board"), {
  position: chess.fen(),
  assetsUrl: "https://cdn.jsdelivr.net/npm/cm-chessboard@8.5.0/assets/",
  style: {borderType: BORDER_TYPE.none, pieces: {file: "pieces/staunty.svg"}, animationDuration: 300},
  orientation: COLOR.white,
  extensions: [
    {class: Markers, props: {autoMarkers: MARKER_TYPE.square}},
    {class: PromotionDialog},
    {class: Accessibility, props: {visuallyHidden: true}}
  ]
})

board.enableMoveInput(inputHandler)

const ws = new Ws()

await ws.connect();

await ws.send('/start classical fen');
