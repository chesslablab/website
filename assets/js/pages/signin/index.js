import { signInForm } from './SignInForm.js';
import { authWebSocket } from '../../websockets/auth/AuthWebSocket.js';

try {
  await Promise.all([
    authWebSocket.connect()
  ]);
} catch {}
