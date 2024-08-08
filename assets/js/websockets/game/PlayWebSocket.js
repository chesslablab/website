import { COLOR, MARKER_TYPE } from '@chesslablab/chessboard';
import { Movetext } from '@chesslablab/js-utils';
import { jwtDecode } from 'jwt-decode';
import GameWebSocket from './GameWebSocket.js';
import { copyInviteCodeModal } from '../../pages/play/online/CopyInviteCodeModal.js';
import { createGameModal } from '../../pages/play/online/CreateGameModal.js';
import { drawModal } from '../../pages/play/online/DrawModal.js';
import { enterInviteCodeModal } from '../../pages/play/online/EnterInviteCodeModal.js';
import { playOnlineButtons } from '../../pages/play/online/PlayOnlineButtons.js';
import { playPanel } from '../../pages/play/online/PlayPanel.js';
import { rematchModal } from '../../pages/play/online/RematchModal.js';
import { takebackModal } from '../../pages/play/online/TakebackModal.js';
import * as action from '../../../action.js';

export class PlayWebSocket extends GameWebSocket {
  timerTableInterval;

  toggleInput(turn) {
    this.chessboard.state.inputWhiteEnabled = false;
    this.chessboard.state.inputBlackEnabled = false;
    if (turn === sessionStorage.getItem('color')) {
      if (turn === COLOR.white) {
        this.chessboard.state.inputWhiteEnabled = true;
      } else {
        this.chessboard.state.inputBlackEnabled = true;
      }
    }
    this.chessboard.view.visualizeInputState();
  }

  _end() {
    super._end();
    playPanel.props.gameActionsDropdown.el.classList.add('d-none');
    playPanel.props.finishedButtons.el.classList.remove('d-none');
    clearInterval(this._timerTableInterval);
  }
}

export const playWebSocket = new PlayWebSocket()
  .watch('broadcast', data => {
    playOnlineButtons.props.playersButtons.props.games = data.onlineGames;
    playOnlineButtons.props.playersButtons.mount();
  })
  .watch('/start', data => {
    if (data.jwt) {
      copyInviteCodeModal.props.form.elements['hash'].value = data.hash;
      const jwtDecoded = jwtDecode(data.jwt);
      playWebSocket.chessboard.setPosition(data.fen, true);
      playWebSocket.chessboard.setOrientation(jwtDecoded.color);
      playWebSocket.chessboard.props.variant = data.variant;
      playWebSocket.chessboard.props.startPos = data.startPos;
      createGameModal.props.modal.hide();
      playWebSocket.send('/online_games');
      sessionStorage.setItem('hash', data.hash);
    } else {
      console.log('Invalid FEN, please try again with a different one.');
    }
  })
  .watch('/legal', data => {
    data.forEach(sq => {
      playWebSocket.chessboard.addMarker(MARKER_TYPE.dot, sq);
    });
  })
  .watch('/play_lan', data => {
    if (data.isValid) {
      playWebSocket.chessboard.setPosition(data.fen, true);
      playPanel.props.sanMovesBrowser.current = playPanel.props.sanMovesBrowser.props.fen.length;
      playPanel.props.sanMovesBrowser.props.movetext
        = Movetext.notation(localStorage.getItem('notation'), data.movetext);
      playPanel.props.sanMovesBrowser.props.fen
        = playPanel.props.sanMovesBrowser.props.fen.concat(data.fen);
      playPanel.props.sanMovesBrowser.mount();
      playWebSocket.toggleInput(data.turn);
      playPanel.props.timerTable.props = {
        turn: data.turn,
        w: data.timer.w,
        b: data.timer.b
      };
      playWebSocket.gameOver(data);
    } else {
      playWebSocket.chessboard.setPosition(data.fen, false);
    }
  })
  .watch('/undo', data => {
    playWebSocket.chessboard.setPosition(data.fen, true);
    if (!data.movetext) {
      playWebSocket.chessboard.state.inputWhiteEnabled = true;
      playWebSocket.chessboard.state.inputBlackEnabled = false;
    }
    playPanel.props.sanMovesBrowser.current -= 1;
    playPanel.props.sanMovesBrowser.props.fen.splice(-1);
    playPanel.props.sanMovesBrowser.props.movetext
      = Movetext.notation(localStorage.getItem('notation'), data.movetext);
    playPanel.props.sanMovesBrowser.mount();
  })
  .watch('/accept', data => {
    if (data.jwt) {
      const jwtDecoded = jwtDecode(data.jwt);
      const turn = jwtDecoded.fen.split(' ')[1];
      playWebSocket.chessboard.disableMoveInput();
      playWebSocket.chessboard.enableMoveInput(event => playWebSocket.inputHandler(event));
      playWebSocket.chessboard.setPosition(jwtDecoded.fen, true);
      if (!sessionStorage.getItem('color')) {
        if (jwtDecoded.color === COLOR.white) {
          playWebSocket.chessboard.setOrientation(COLOR.black);
          sessionStorage.setItem('color', COLOR.black);
        } else {
          playWebSocket.chessboard.setOrientation(COLOR.white);
          sessionStorage.setItem('color', COLOR.white);
        }
      }
      playWebSocket.toggleInput(turn);
      enterInviteCodeModal.props.modal.hide();
      createGameModal.props.modal.hide();
      playWebSocket.infoModal.props.modal.hide();
      sessionStorage.setItem('hash', data.hash);
      playPanel.props.timerTable.props = {
        turn: turn,
        w: data.timer.w,
        b: data.timer.b
      };
      playWebSocket.timerTableInterval = playPanel.props.timerTableInterval();
      playOnlineButtons.el.classList.add('d-none');
      playPanel.el.classList.remove('d-none');
      playWebSocket.send('/online_games');
    } else {
      enterInviteCodeModal.props.modal.hide();
      playWebSocket.infoModal.props.msg = "Invalid invite code, please try again";
      playWebSocket.infoModal.mount();
      playWebSocket.infoModal.props.modal.show();
    }
  })
  .watch('/takeback', data => {
    if (data.action === action.PROPOSE) {
      if (sessionStorage.getItem('takeback') !== action.PROPOSE) {
        takebackModal.props.modal.show();
      }
    } else if (data.action === action.DECLINE) {
      takebackModal.props.modal.hide();
      playWebSocket.infoModal.props.msg = "Takeback declined";
      playWebSocket.infoModal.mount();
      playWebSocket.infoModal.props.modal.show();
    } else if (data.action === action.ACCEPT) {
      playWebSocket.infoModal.props.msg = "Takeback accepted";
      playWebSocket.infoModal.mount();
      playWebSocket.infoModal.props.modal.show();
    }
    sessionStorage.removeItem('takeback');
  })
  .watch('/draw', data => {
    if (data.action === action.PROPOSE) {
      if (sessionStorage.getItem('draw') !== action.PROPOSE) {
        drawModal.props.modal.show();
      }
    } else if (data.action === action.DECLINE) {
      drawModal.props.modal.hide();
      playWebSocket.infoModal.props.msg = "Draw offer declined";
      playWebSocket.infoModal.mount();
      playWebSocket.infoModal.props.modal.show();
    } else if (data.action === action.ACCEPT) {
      playWebSocket.end();
      playWebSocket.infoModal.props.msg = "Draw offer accepted";
      playWebSocket.infoModal.mount();
      playWebSocket.infoModal.props.modal.show();
    }
    sessionStorage.removeItem('draw');
  })
  .watch('/resign', data => {
    if (data.action === action.ACCEPT) {
      playWebSocket.end();
      playWebSocket.infoModal.props.msg = "The game is resigned";
      playWebSocket.infoModal.mount();
      playWebSocket.infoModal.props.modal.show();
    }
  })
  .watch('/rematch', data => {
    if (data.action === action.PROPOSE) {
      if (sessionStorage.getItem('rematch') !== action.PROPOSE) {
        rematchModal.props.modal.show();
      }
    } else if (data.action === action.DECLINE) {
      rematchModal.props.modal.hide();
      playWebSocket.infoModal.props.modal.hide();
    } else if (data.action === action.ACCEPT) {
      playWebSocket.send(`/restart ${sessionStorage.getItem('hash')}`);
    }
    sessionStorage.removeItem('rematch');
  })
  .watch('/restart', data => {
    if (data.jwt) {
      playWebSocket.infoModal.props.modal.hide();
      const jwtDecoded = jwtDecode(data.jwt);
      const turn = jwtDecoded.fen.split(' ')[1];
      playWebSocket.chessboard.setPosition(jwtDecoded.fen, true);
      playWebSocket.toggleInput(turn);
      playWebSocket.chessboard.view.visualizeInputState();
      playPanel.props.sanMovesBrowser.current = 0;
      playPanel.props.sanMovesBrowser.props.fen = [
        jwtDecoded.fen
      ];
      playPanel.props.sanMovesBrowser.props.movetext = '';
      playPanel.props.sanMovesBrowser.mount();
      playPanel.props.timerTable.props = {
        turn: turn,
        w: data.timer.w,
        b: data.timer.b
      };
      playWebSocket.timerTableInterval = playPanel.props.timerTableInterval();
      sessionStorage.setItem('hash', data.hash);
      playOnlineButtons.el.classList.add('d-none');
      playPanel.props.gameActionsDropdown.el.classList.remove('d-none');
      playPanel.props.finishedButtons.el.classList.add('d-none');
    }
  })
  .watch('/leave', data => {
    if (data.action === action.ACCEPT) {
      playWebSocket.end();
      playPanel.props.finishedButtons.el.children.item(0).classList.add('d-none');
      playWebSocket.infoModal.props.msg = "Your opponent is gone";
      playWebSocket.infoModal.mount();
      playWebSocket.infoModal.props.modal.show();
    }
  })
  .watch('/online_games', data => {
    playOnlineButtons.props.playersButtons.props.games = data;
    playOnlineButtons.props.playersButtons.mount();
  });
