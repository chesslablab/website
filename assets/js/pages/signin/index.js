import { signInForm } from './SignInForm.js';
import { dataWebSocket } from '../../websockets/data/DataWebSocket.js';

sessionStorage.clear();

try {
  await dataWebSocket.connect();
} catch {}
