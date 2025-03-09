import AbstractWebSocket from './AbstractWebSocket.js';

export class DataWebSocket extends AbstractWebSocket {
  static PORT = 9443;

  async connect() {
    await super.connect(DataWebSocket.PORT);
    this.socket.onmessage = (res) => {
      const data = JSON.parse(res.data);
      this.response[Object.keys(data)[0]] = Object.values(data)[0];
    };
  }
}

export const dataWebSocket = new DataWebSocket();
