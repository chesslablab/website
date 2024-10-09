import jsCookie from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { createGameModal } from './CreateGameModal.js';
import { playFriendModal } from './PlayFriendModal.js';
import chessboard from '../../chessboard.js';
import { rankingTable } from '../../RankingTable.js';
import { authWebSocket } from '../../../websockets/auth/AuthWebSocket.js';
import { binaryWebSocket } from '../../../websockets/binary/BinaryWebSocket.js';
import { dataWebSocket } from '../../../websockets/data/DataWebSocket.js';
import { playWebSocket } from '../../../websockets/game/PlayWebSocket.js';

sessionStorage.clear();

chessboard.state.inputWhiteEnabled = false;
chessboard.state.inputBlackEnabled = false;

try {
  await authWebSocket.connect();
} catch {}

try {
  await binaryWebSocket.connect();
} catch {}

try {
  await dataWebSocket.connect();
} catch {}

try {
  await playWebSocket.connect();
} catch {}

window.addEventListener('beforeunload', function () {
  playWebSocket.send('/leave', {
    color: playWebSocket.color()
  });

  return false;
});

authWebSocket
  .send('/totp_refresh', {
    access_token: jsCookie.get('access_token')
  })
  .onChange('/totp_refresh', data => {
    if (data?.access_token) {
      jsCookie.set('access_token', data.access_token);
    }
  });

playWebSocket.send('/online_games');

dataWebSocket
  .send(`/ranking`)
  .onChange('/ranking', data => {
    rankingTable.props.data = data;
    rankingTable.mount();
  });
