import { dataWebSocket } from '../../../websockets/data/DataWebSocket.js';

sessionStorage.clear();

try {
  await dataWebSocket.connect();
} catch {}

dataWebSocket
  .send(`/qr`)
  .onChange('/qr', data => {
    const img = document.createElement('img');
    img.src = data.uri;
    document.getElementById('qrCodeUri').appendChild(img);
  });
