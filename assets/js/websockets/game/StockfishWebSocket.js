import { COLOR, MARKER_TYPE } from '@chesslablab/chessboard';
import { Movetext } from '@chesslablab/js-utils';
import GameWebSocket from './GameWebSocket.js';
import { stockfishPanel } from '../../pages/StockfishPanel.js';
import * as mode from '../../../mode.js';
import * as variant from '../../../variant.js';

export const stockfishWebSocket = new GameWebSocket()
  .watch('/start', data => {
    stockfishWebSocket.chessboard.disableMoveInput();
    stockfishWebSocket.chessboard.enableMoveInput(event => stockfishWebSocket.inputHandler(event));
    stockfishWebSocket.chessboard.setPosition(data.fen, true);
    if (data.color === COLOR.black) {
      stockfishWebSocket.chessboard.setOrientation(COLOR.black);
    }
    if (data.fen.split(' ')[1] !== data.color) {
      stockfishWebSocket.send(`/stockfish "{\\"Skill Level\\":${sessionStorage.getItem('skillLevel')}}" "{\\"depth\\":12}"`);
    }
  })
  .watch('/legal', data => {
    data.forEach(sq => {
      stockfishWebSocket.chessboard.addMarker(MARKER_TYPE.dot, sq);
    });
  })
  .watch('/play_lan', data => {
    if (data.isValid) {
      stockfishWebSocket.chessboard.setPosition(data.fen, true);
      stockfishPanel.props.sanMovesBrowser.current = stockfishPanel.props.sanMovesBrowser.props.fen.length;
      stockfishPanel.props.sanMovesBrowser.props.movetext
        = Movetext.notation(localStorage.getItem('notation'), data.movetext);
      stockfishPanel.props.sanMovesBrowser.props.fen
        = stockfishPanel.props.sanMovesBrowser.props.fen.concat(data.fen);
      stockfishPanel.props.sanMovesBrowser.mount();
      stockfishPanel.props.openingTable.props.movetext = data.movetext;
      stockfishPanel.props.openingTable.mount();
      if (!stockfishWebSocket.gameOver(data, stockfishWebSocket.chessboard)) {
        stockfishWebSocket.send(`/stockfish "{\\"Skill Level\\":${sessionStorage.getItem('skillLevel')}}" "{\\"depth\\":12}"`);
      }
    } else {
      stockfishWebSocket.chessboard.setPosition(data.fen, false);
    }
  })
  .watch('/undo', data => {
    stockfishWebSocket.chessboard.setPosition(data.fen, true);
    if (!data.movetext) {
      stockfishWebSocket.chessboard.state.inputWhiteEnabled = true;
      stockfishWebSocket.chessboard.state.inputBlackEnabled = false;
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
    stockfishWebSocket.chessboard.setPosition(data.fen, true);
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
    stockfishWebSocket.chessboard.state.inputWhiteEnabled = false;
    stockfishWebSocket.chessboard.state.inputBlackEnabled = false;
    if (data.turn === COLOR.white) {
      stockfishWebSocket.chessboard.state.inputWhiteEnabled = true;
    } else {
      stockfishWebSocket.chessboard.state.inputBlackEnabled = true;
    }
    sessionStorage.setItem('skillLevel', 20);
    sessionStorage.setItem('depth', 12);
    const settings = {
      color: data.turn,
      fen: data.fen
    };
    stockfishWebSocket.send(`/start ${variant.CLASSICAL} ${mode.STOCKFISH} "${JSON.stringify(settings).replace(/"/g, '\\"')}"`);
  });
