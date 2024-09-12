import * as connect from '../../connect.js';
import AbstractWebSocket from '../../AbstractWebSocket.js';

export class AuthWebSocket extends AbstractWebSocket {
  static PORT = 6443;

  async connect() {
    await super.connect(`${connect.ws()}:${AuthWebSocket.PORT}`);

    this.socket.onmessage = (res) => {
      const data = JSON.parse(res.data);
      const msg = Object.keys(data)[0];
      this.response[msg] = data[msg];
      switch (msg) {
        case 'error':
          console.log('Whoops! Something went wrong.');
          break;

        default:
          break;
      }
    };
  }
}

export const authWebSocket = new AuthWebSocket();
