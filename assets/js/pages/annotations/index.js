import { annotationsWebSocket } from '../../websockets/game/AnnotationsWebSocket.js';

try {
  await Promise.all([
    annotationsWebSocket.connect()
  ]);
} catch {}
