import jsCookie from 'js-cookie';
import { createGameModal } from './CreateGameModal.js';
import { playFriendModal } from './PlayFriendModal.js';
import chessboard from '../../chessboard.js';
import { rankingTable } from '../../RankingTable.js';
import { authWebSocket } from '../../../websockets/auth/AuthWebSocket.js';
import { binaryWebSocket } from '../../../websockets/binary/BinaryWebSocket.js';
import { dataWebSocket } from '../../../websockets/data/DataWebSocket.js';
import { playWebSocket } from '../../../websockets/game/PlayWebSocket.js';

sessionStorage.clear();

try {
  await Promise.all([
    authWebSocket.connect(),
    binaryWebSocket.connect(),
    dataWebSocket.connect(),
    playWebSocket.connect()
  ]);
} catch {}

authWebSocket
  .send('/totp_refresh', {
    access_token: jsCookie.get('access_token')
  })
  .onChange('/totp_refresh', data => {
    if (data?.access_token) {
      jsCookie.set('access_token', data.access_token);
    }
  });

dataWebSocket
  .send(`/ranking`)
  .onChange('/ranking', data => {
    rankingTable.props.data = data;
    rankingTable.mount();
  });

playWebSocket.send('/online_games');

window.addEventListener('beforeunload', function () {
  playWebSocket.send('/leave', {
    color: playWebSocket.color()
  });

  return false;
});
