import { authWebSocket } from '../../../websockets/auth/AuthWebSocket.js';

try {
  await Promise.all([
    authWebSocket.connect()
  ]);
} catch {}

authWebSocket
  .send(`/totp_signup`)
  .onChange('/totp_signup', data => {
    const img = document.createElement('img');
    img.src = data.uri;
    document.getElementById('qrCodeUri').appendChild(img);
  });