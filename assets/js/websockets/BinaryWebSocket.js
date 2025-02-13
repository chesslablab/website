import AbstractWebSocket from './AbstractWebSocket.js';

export class BinaryWebSocket extends AbstractWebSocket {
  static PORT = 7443;

  async connect() {
    await super.connect(BinaryWebSocket.PORT);
    this.binaryType = "arraybuffer";
    this.socket.onmessage = (res) => {
      const data = JSON.parse(res.data);
      const msg = Object.keys(data)[0];
      this.response[msg] = data[msg];
      if (msg === 'error') {
        console.log('Whoops! Something went wrong.');
      } else {
        const data = JSON.parse(res.data);
        const a = document.createElement("a");
        a.href = 'data:image/png;base64,' + data['/image'];
        a.download = "chessboard.png";
        a.click();
      }
    };
  }
}

export const binaryWebSocket = new BinaryWebSocket();
