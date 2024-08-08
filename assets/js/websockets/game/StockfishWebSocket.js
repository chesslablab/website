import { COLOR, MARKER_TYPE } from '@chesslablab/chessboard';
import { Movetext } from '@chesslablab/js-utils';
import AbstractGameWebSocket from './AbstractGameWebSocket.js';
import chessboard from '../../pages/chessboard.js';
import { stockfishPanel } from '../../pages/StockfishPanel.js';
import * as mode from '../../../mode.js';
import * as variant from '../../../variant.js';

export class StockfishWebSocket extends AbstractGameWebSocket {
}

export const stockfishWebSocket = new StockfishWebSocket()
  .watch('/start', data => {
    chessboard.disableMoveInput();
    chessboard.enableMoveInput(event => stockfishWebSocket.inputHandler(event));
    chessboard.setPosition(data.fen, true);
    if (data.color === COLOR.black) {
      chessboard.setOrientation(COLOR.black);
    }
    if (data.fen.split(' ')[1] !== data.color) {
      stockfishWebSocket.send(`/stockfish "{\\"Skill Level\\":${sessionStorage.getItem('skillLevel')}}" "{\\"depth\\":12}"`);
    }
  })
  .watch('/legal', data => {
    data.forEach(sq => {
      chessboard.addMarker(MARKER_TYPE.dot, sq);
    });
  })
  .watch('/play_lan', data => {
    if (data.isValid) {
      chessboard.setPosition(data.fen, true);
      stockfishPanel.props.sanMovesBrowser.current = stockfishPanel.props.sanMovesBrowser.props.fen.length;
      stockfishPanel.props.sanMovesBrowser.props.movetext
        = Movetext.notation(localStorage.getItem('notation'), data.movetext);
      stockfishPanel.props.sanMovesBrowser.props.fen
        = stockfishPanel.props.sanMovesBrowser.props.fen.concat(data.fen);
      stockfishPanel.props.sanMovesBrowser.mount();
      stockfishPanel.props.openingTable.props.movetext = data.movetext;
      stockfishPanel.props.openingTable.mount();
      if (!stockfishWebSocket.gameOver(data, chessboard)) {
        stockfishWebSocket.send(`/stockfish "{\\"Skill Level\\":${sessionStorage.getItem('skillLevel')}}" "{\\"depth\\":12}"`);
      }
    } else {
      chessboard.setPosition(data.fen, false);
    }
  })
  .watch('/undo', data => {
    chessboard.setPosition(data.fen, true);
    if (!data.movetext) {
      chessboard.state.inputWhiteEnabled = true;
      chessboard.state.inputBlackEnabled = false;
    }
    stockfishPanel.props.sanMovesBrowser.current -= 1;
    stockfishPanel.props.sanMovesBrowser.props.fen.splice(-1);
    stockfishPanel.props.sanMovesBrowser.props.movetext
      = Movetext.notation(localStorage.getItem('notation'), data.movetext);
    stockfishPanel.props.sanMovesBrowser.mount();
    stockfishPanel.props.openingTable.props.movetext = data.movetext;
    stockfishPanel.props.openingTable.mount();
  })
  .watch('/stockfish', data => {
    chessboard.setPosition(data.fen, true);
    stockfishPanel.props.sanMovesBrowser.current = stockfishPanel.props.sanMovesBrowser.props.fen.length;
    stockfishPanel.props.sanMovesBrowser.props.movetext
      = Movetext.notation(localStorage.getItem('notation'), data.movetext);
    stockfishPanel.props.sanMovesBrowser.props.fen
      = stockfishPanel.props.sanMovesBrowser.props.fen.concat(data.fen);
    stockfishPanel.props.sanMovesBrowser.mount();
    stockfishPanel.props.openingTable.props.movetext = data.movetext;
    stockfishPanel.props.openingTable.mount();
    stockfishWebSocket.gameOver(data);
  })
  .watch('/randomizer', data => {
    chessboard.state.inputWhiteEnabled = false;
    chessboard.state.inputBlackEnabled = false;
    if (data.turn === COLOR.white) {
      chessboard.state.inputWhiteEnabled = true;
    } else {
      chessboard.state.inputBlackEnabled = true;
    }
    sessionStorage.setItem('skillLevel', 20);
    sessionStorage.setItem('depth', 12);
    const settings = {
      color: data.turn,
      fen: data.fen
    };
    stockfishWebSocket.send(`/start ${variant.CLASSICAL} ${mode.STOCKFISH} "${JSON.stringify(settings).replace(/"/g, '\\"')}"`);
  });
