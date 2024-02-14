import {INPUT_EVENT_TYPE, Chessboard} from "cm-chessboard"
import {FEN} from "../vendor/cm-chessboard/src/model/Position.js"
import {Markers} from "../vendor/cm-chessboard/src/extensions/markers/Markers.js"

window.board = new Chessboard(document.getElementById("board"), {
  position: FEN.start,
  assetsUrl: "../cm-chessboard/",
  style: {pieces: {file: "pieces/staunty.svg"}},
  extensions: [{class: Markers}]
})

window.board.enableMoveInput(inputHandler)

function inputHandler(event) {
  console.log(event)
  switch (event.type) {
    case INPUT_EVENT_TYPE.moveInputStarted:
      return true // false cancels move
    case INPUT_EVENT_TYPE.validateMoveInput:
      return true // false cancels move
    case INPUT_EVENT_TYPE.moveInputCanceled:
      break
    case INPUT_EVENT_TYPE.moveInputFinished:
      break
    case INPUT_EVENT_TYPE.movingOverSquare:
      break
  }
}

const output = document.getElementById("output")
