import { authWebSocket } from '../../../websockets/AuthWebSocket.js';

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
    document.querySelector('#qrCodeUri').appendChild(img);
  });
