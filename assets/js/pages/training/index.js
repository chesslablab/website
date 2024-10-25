import { checkmateForm } from './CheckmateForm.js';
import { endgameForm } from './EndgameForm.js';
import { binaryWebSocket } from '../../websockets/binary/BinaryWebSocket.js';
import { stockfishWebSocket } from '../../websockets/game/StockfishWebSocket.js';

try {
  await Promise.all([
    binaryWebSocket.connect(),
    stockfishWebSocket.connect()
  ]);
} catch {}
