import { Movetext } from '@chesslablab/js-utils';
import GameWebSocket from './GameWebSocket.js';
import { ravPanel } from '../../pages/RavPanel.js';

export class AnnotationsWebSocket extends GameWebSocket {
  constructor() {
    super();

    this.onChange('/play_rav', data => {
      ravPanel.props.movesBrowser.current = data.fen.length - 1;
      ravPanel.props.movesBrowser.props.chessboard.setPosition(data.fen[data.fen.length - 1]);
      ravPanel.props.movesBrowser.props = {
        ...ravPanel.props.movesBrowser.props,
        filtered: Movetext.notation(localStorage.getItem('notation'), data.filtered),
        breakdown: data.breakdown.map(value => Movetext.notation(localStorage.getItem('notation'), value)),
        fen: data.fen
      };
      ravPanel.props.movesBrowser.mount();
      ravPanel.progressModal.props.modal.hide();
    });
  }
}

export const annotationsWebSocket = new AnnotationsWebSocket();
