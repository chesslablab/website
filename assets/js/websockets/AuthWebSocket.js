import AbstractWebSocket from './AbstractWebSocket.js';
import * as connect from '../connect.js';

export class AuthWebSocket extends AbstractWebSocket {
  static PORT = 6443;

  async connect() {
    await super.connect(`${connect.ws()}:${AuthWebSocket.PORT}`);
    this.socket.onmessage = (res) => {
      const data = JSON.parse(res.data);
      const msg = Object.keys(data)[0];
      this.response[msg] = data[msg];
      if (msg === 'error') {
        console.log('Whoops! Something went wrong.');
      }
    };
  }
}

export const authWebSocket = new AuthWebSocket();
