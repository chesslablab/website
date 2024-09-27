import jsCookie from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { COLOR, MARKER_TYPE } from '@chesslablab/chessboard';
import { Movetext } from '@chesslablab/js-utils';
import AbstractGameWebSocket from './AbstractGameWebSocket.js';
import { copyInviteCodeModal } from '../../pages/play/online/CopyInviteCodeModal.js';
import { createGameModal } from '../../pages/play/online/CreateGameModal.js';
import { enterInviteCodeModal } from '../../pages/play/online/EnterInviteCodeModal.js';
import { playOnlineButtons } from '../../pages/play/online/PlayOnlineButtons.js';
import { playPanel } from '../../pages/play/online/PlayPanel.js';
import { authWebSocket } from '../../websockets/auth/AuthWebSocket.js';
import * as action from '../../../action.js';

export class PlayWebSocket extends AbstractGameWebSocket {
  timerTableInterval;

  constructor() {
    super();

    this.onChange('broadcast', data => {
      playOnlineButtons.props.playersButtons.props.games = data.onlineGames;
      playOnlineButtons.props.playersButtons.mount();
    })
    .onChange('/start', data => {
      if (data.jwt) {
        copyInviteCodeModal.props.form.elements['uid'].value = data.uid;
        copyInviteCodeModal.props.modal.show();
        const startToken = jwtDecode(data.jwt);
        this.chessboard.setPosition(data.fen, true);
        this.chessboard.setOrientation(startToken.color);
        this.chessboard.props.variant = data.variant;
        this.chessboard.props.startPos = data.startPos;
        createGameModal.props.modal.hide();
        this.send('/online_games');
        sessionStorage.setItem('start_token', data.jwt);
      } else {
        this.infoModal.props.msg = "Invalid FEN, please try again with a different one";
        this.infoModal.mount();
        this.infoModal.props.modal.show();
      }
    })
    .onChange('/legal', data => {
      data.forEach(sq => {
        this.chessboard.addMarker(MARKER_TYPE.dot, sq);
      });
    })
    .onChange('/play_lan', data => {
      if (data.isValid) {
        this.chessboard.setPosition(data.fen, true);
        playPanel.props.movesBrowser.current = playPanel.props.movesBrowser.props.fen.length;
        playPanel.props.movesBrowser.props.movetext
          = Movetext.notation(localStorage.getItem('notation'), data.movetext);
        playPanel.props.movesBrowser.props.fen
          = playPanel.props.movesBrowser.props.fen.concat(data.fen);
        playPanel.props.movesBrowser.mount();
        this.toggleInput(data.turn);
        playPanel.props.timerTable.props = {
          ...playPanel.props.timerTable.props,
          turn: data.turn,
          seconds: {
            w: data.timer.w,
            b: data.timer.b
          }
        };
        if (data.end) {
          this.end();
          this.infoModal.props.msg = data.end.msg;
          this.infoModal.mount();
          this.infoModal.props.modal.show();
          authWebSocket
            .send('/totp_refresh', {
              access_token: jsCookie.get('access_token')
            })
            .onChange('/totp_refresh', data => {
              if (data?.access_token) {
                jsCookie.set('access_token', data.access_token);
              }
            });
        }
      } else {
        this.chessboard.setPosition(data.fen, false);
      }
    })
    .onChange('/undo', data => {
      this.chessboard.setPosition(data.fen, true);
      if (!data.movetext) {
        this.chessboard.state.inputWhiteEnabled = true;
        this.chessboard.state.inputBlackEnabled = false;
      }
      playPanel.props.movesBrowser.current -= 1;
      playPanel.props.movesBrowser.props.fen.splice(-1);
      playPanel.props.movesBrowser.props.movetext
        = Movetext.notation(localStorage.getItem('notation'), data.movetext);
      playPanel.props.movesBrowser.mount();
    })
    .onChange('/accept', data => {
      if (data.jwt) {
        const acceptToken = jwtDecode(data.jwt);
        const turn = acceptToken.fen.split(' ')[1];
        this.chessboard.disableMoveInput();
        this.chessboard.enableMoveInput(event => this.inputHandler(event));
        this.chessboard.setPosition(acceptToken.fen, true);
        sessionStorage.setItem('accept_token', data.jwt);
        this.chessboard.setOrientation(this.color());
        this.toggleInput(turn);
        enterInviteCodeModal.props.modal.hide();
        createGameModal.props.modal.hide();
        this.infoModal.props.modal.hide();
        playPanel.props.timerTable.props = {
          turn: turn,
          seconds: {
            w: data.timer.w,
            b: data.timer.b
          },
          username: {
            w: `${acceptToken.username.w} ${acceptToken.elo.w ? (acceptToken.elo.w) : ''}`,
            b: `${acceptToken.username.b} ${acceptToken.elo.b ? (acceptToken.elo.b) : ''}`
          }
        };
        this.timerTableInterval = playPanel.props.timerTableInterval();
        playOnlineButtons.el.classList.add('d-none');
        playPanel.el.classList.remove('d-none');
        this.send('/online_games');
      } else {
        enterInviteCodeModal.props.modal.hide();
        this.infoModal.props.msg = "Invalid invite code, please try again";
        this.infoModal.mount();
        this.infoModal.props.modal.show();
      }
    })
    .onChange('/takeback', data => {
      if (data.action === action.PROPOSE) {
        playPanel.props.takebackModal.props.modal.show();
      } else if (data.action === action.DECLINE) {
        playPanel.props.takebackModal.props.modal.hide();
        this.infoModal.props.msg = "Takeback declined";
        this.infoModal.mount();
        this.infoModal.props.modal.show();
      } else if (data.action === action.ACCEPT) {
        this.infoModal.props.msg = "Takeback accepted";
        this.infoModal.mount();
        this.infoModal.props.modal.show();
      }
    })
    .onChange('/draw', data => {
      if (data.action === action.PROPOSE) {
        playPanel.props.drawModal.props.modal.show();
      } else if (data.action === action.DECLINE) {
        playPanel.props.drawModal.props.modal.hide();
        this.infoModal.props.msg = "Draw offer declined";
        this.infoModal.mount();
        this.infoModal.props.modal.show();
      } else if (data.action === action.ACCEPT) {
        this.end();
        this.infoModal.props.msg = "Draw offer accepted";
        this.infoModal.mount();
        this.infoModal.props.modal.show();
      }
    })
    .onChange('/resign', data => {
      this.end();
      this.infoModal.props.msg = "The game is resigned";
      this.infoModal.mount();
      this.infoModal.props.modal.show();
      authWebSocket
        .send('/totp_refresh', {
          access_token: jsCookie.get('access_token')
        })
        .onChange('/totp_refresh', data => {
          if (data?.access_token) {
            jsCookie.set('access_token', data.access_token);
          }
        });
    })
    .onChange('/rematch', data => {
      if (data.action === action.PROPOSE) {
        playPanel.props.rematchModal.props.modal.show();
      } else if (data.action === action.DECLINE) {
        playPanel.props.rematchModal.props.modal.hide();
        this.infoModal.props.modal.hide();
      } else if (data.action === action.ACCEPT) {
        this.send('/restart', {
          jwt: sessionStorage.getItem('accept_token')
        });
      }
    })
    .onChange('/restart', data => {
      if (data.jwt) {
        this.infoModal.props.modal.hide();
        const restartToken = jwtDecode(data.jwt);
        const turn = restartToken.fen.split(' ')[1];
        this.chessboard.setPosition(restartToken.fen, true);
        this.toggleInput(turn);
        this.chessboard.view.visualizeInputState();
        playPanel.props.movesBrowser.current = 0;
        playPanel.props.movesBrowser.props.fen = [
          restartToken.fen
        ];
        playPanel.props.movesBrowser.props.movetext = '';
        playPanel.props.movesBrowser.mount();
        playPanel.props.timerTable.props = {
          ...playPanel.props.timerTable.props,
          turn: turn,
          seconds: {
            w: data.timer.w,
            b: data.timer.b
          }
        };
        this.timerTableInterval = playPanel.props.timerTableInterval();
        playOnlineButtons.el.classList.add('d-none');
        playPanel.props.gameActionsDropdown.el.classList.remove('d-none');
        playPanel.props.finishedButtons.el.classList.add('d-none');
      }
    })
    .onChange('/leave', data => {
      this.end();
      playPanel.props.finishedButtons.el.children.item(0).classList.add('d-none');
      this.infoModal.props.msg = "The game is abandoned";
      this.infoModal.mount();
      this.infoModal.props.modal.show();
      authWebSocket
        .send('/totp_refresh', {
          access_token: jsCookie.get('access_token')
        })
        .onChange('/totp_refresh', data => {
          if (data?.access_token) {
            jsCookie.set('access_token', data.access_token);
          }
        });
    })
    .onChange('/online_games', data => {
      playOnlineButtons.props.playersButtons.props.games = data;
      playOnlineButtons.props.playersButtons.mount();
    });
  }

  toggleInput(turn) {
    this.chessboard.state.inputWhiteEnabled = false;
    this.chessboard.state.inputBlackEnabled = false;
    if (turn === this.color()) {
      if (turn === COLOR.white) {
        this.chessboard.state.inputWhiteEnabled = true;
      } else {
        this.chessboard.state.inputBlackEnabled = true;
      }
    }
    this.chessboard.view.visualizeInputState();
  }

  end() {
    super.end();
    playPanel.props.gameActionsDropdown.el.classList.add('d-none');
    playPanel.props.finishedButtons.el.classList.remove('d-none');
    clearInterval(this.timerTableInterval);
  }

  color() {
    const acceptToken = sessionStorage.getItem('accept_token')
      ? jwtDecode(sessionStorage.getItem('accept_token'))
      : null;
    const startToken = sessionStorage.getItem('start_token')
      ? jwtDecode(sessionStorage.getItem('start_token'))
      : null;
    if (acceptToken?.uid === startToken?.uid) {
      return acceptToken.color;
    }

    return acceptToken.color === COLOR.white ? COLOR.black : COLOR.white
  }
}

export const playWebSocket = new PlayWebSocket();
