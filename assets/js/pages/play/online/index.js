import jsCookie from 'js-cookie';
import { createGameModal } from './CreateGameModal.js';
import { playFriendModal } from './PlayFriendModal.js';
import { rankingTable } from './RankingTable.js';
import chessboard from '../../chessboard.js';
import { authWebSocket } from '../../../websockets/AuthWebSocket.js';
import { binaryWebSocket } from '../../../websockets/BinaryWebSocket.js';
import { dataWebSocket } from '../../../websockets/DataWebSocket.js';
import { playWebSocket } from '../../../websockets/game/PlayWebSocket.js';

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
