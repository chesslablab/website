import { signInForm } from './SignInForm.js';
import { authWebSocket } from '../../websockets/auth/AuthWebSocket.js';

sessionStorage.clear();

try {
  await Promise.all([
    authWebSocket.connect()
  ]);
} catch {}
