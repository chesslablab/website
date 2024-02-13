import {Chessboard} from "https://cdn.jsdelivr.net/npm/cm-chessboard@8/src/Chessboard.js"
import {FEN} from "https://cdn.jsdelivr.net/npm/cm-chessboard@8/src/Chessboard.js"
import {Chess} from "https://cdn.jsdelivr.net/npm/chess.mjs@1/src/chess.mjs/Chess.js"

const chess = new Chess()
const board = new Chessboard(document.getElementById("board"), {
    assetsUrl: "../cm-chessboard/",
    position: FEN.start
})
const interval = setInterval(() => {
    makeRandomMove()
    board.setPosition(chess.fen(), true)
}, 500)
function makeRandomMove() {
    if(chess.game_over()) {
        chess.reset()
    }
    const possibleMoves = chess.moves()
    if (possibleMoves.length === 0) {
        clearInterval(interval)
        return
    }
    const randomIndex = Math.floor(Math.random() * possibleMoves.length)
    chess.move(possibleMoves[randomIndex])
}
