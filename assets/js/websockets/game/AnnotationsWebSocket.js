import GameWebSocket from './GameWebSocket.js';
import { ravPanel } from '../../pages/RavPanel.js';

export const annotationsWebSocket = new GameWebSocket()
  .watch('/play_rav', data => {
    ravPanel.props.ravMovesBrowser.current = data.fen.length - 1;
    ravPanel.props.ravMovesBrowser.props.chessboard.setPosition(data.fen[data.fen.length - 1]);
    ravPanel.props.ravMovesBrowser.props = {
      ...ravPanel.props.ravMovesBrowser.props,
      filtered: data.filtered,
      breakdown: data.breakdown,
      fen: data.fen
    };
    ravPanel.props.ravMovesBrowser.mount();
  });
