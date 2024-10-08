import { binaryWebSocket } from '../../websockets/binary/BinaryWebSocket.js';
import { annotationsWebSocket } from '../../websockets/game/AnnotationsWebSocket.js';
import * as mode from '../../../mode.js';

sessionStorage.clear();

try {
  await binaryWebSocket.connect();
} catch {}

try {
  await annotationsWebSocket.connect();
} catch {}

const url = window.location.href.split('/');

annotationsWebSocket.send('/play_rav', {
  fen: decodeURIComponent(url[7]),
  movetext: decodeURIComponent(url[8]),
  startPos: url[9]
});
