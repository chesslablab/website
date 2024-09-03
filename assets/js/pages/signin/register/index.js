import { dataWebSocket } from '../../../websockets/data/DataWebSocket.js';

sessionStorage.clear();

try {
  await dataWebSocket.connect();
} catch {}

dataWebSocket
  .send(`/totp_signup`)
  .onChange('/totp_signup', data => {
    const img = document.createElement('img');
    img.src = data.uri;
    document.getElementById('qrCodeUri').appendChild(img);
  });
