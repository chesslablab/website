import AbstractWebSocket from './AbstractWebSocket.js';

export class AuthWebSocket extends AbstractWebSocket {
  static PORT = 6443;

  async connect() {
    await super.connect(AuthWebSocket.PORT);
    this.socket.onmessage = (res) => {
      const data = JSON.parse(res.data);
      this.response[Object.keys(data)[0]] = Object.values(data)[0];
    };
  }
}

export const authWebSocket = new AuthWebSocket();
